import { Injectable } from '@nestjs/common';
import {
  FileUpload,
  OneDriveLargeFileUploadOptions,
  OneDriveLargeFileUploadTask,
  UploadResult,
} from '@microsoft/microsoft-graph-client';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { ClientSecretCredential } from '@azure/identity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DocConvertService {
  private client: Client;
  private uploadUserId: string;
  private uploadDirId: string;

  constructor(private readonly configService: ConfigService) {
    this.client = Client.initWithMiddleware({
      debugLogging: true,
      authProvider: new TokenCredentialAuthenticationProvider(
        new ClientSecretCredential(
          this.configService.get('msgraph.tenantId'),
          this.configService.get('msgraph.clientId'),
          this.configService.get('msgraph.clientSecret'),
        ),
        {
          scopes: ['https://graph.microsoft.com/.default'],
        },
      ),
    });
    this.uploadUserId = this.configService.get('msgraph.upload.userId');
    this.uploadDirId = this.configService.get('msgraph.upload.dirId');
  }

  async fromDocxToPdf(docx: Express.Multer.File) {
    const response = (await this.uploadFile(docx)) as { id: string };
    const result = await this.fromItemIdToPdf(response.id, 'pdf');
    return result;
  }

  async fromItemIdToPdf(itemId: string, format: 'pdf') {
    const result = await this.client
      .api(this.buildItemIdConvertUrl(itemId, format))
      .get();
    return result;
  }

  async uploadFile(file: Express.Multer.File) {
    const fileName = encodeURIComponent(file.originalname);
    const fileObject = new FileUpload(file.buffer, fileName, file.size);

    const options: OneDriveLargeFileUploadOptions = {
      fileName,
      rangeSize: 1024 * 1024,
      uploadSessionURL: this.buildUploadSessionURL(fileName),
    };

    const uploadTask =
      await OneDriveLargeFileUploadTask.createTaskWithFileObject(
        this.client,
        fileObject,
        options,
      );

    const uploadResult: UploadResult = await uploadTask.upload();
    return uploadResult.responseBody;
  }

  private buildItemIdConvertUrl(itemId: string, format: 'pdf') {
    return `/users/{${this.uploadUserId}}/drive/items/${itemId}/content?format=${format}`;
  }

  private buildUploadSessionURL(fileName: string) {
    return `/users/{${this.uploadUserId}}/drive/items/${this.uploadDirId}:/${fileName}:/createUploadSession`;
  }
}
