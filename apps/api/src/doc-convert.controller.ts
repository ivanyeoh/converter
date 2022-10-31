import {
  Controller,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocConvertService } from './doc-convert.service';
import { changeFilenameExtension } from 'shared-helpers';
import { Readable } from 'node:stream';
import { buffer } from 'node:stream/consumers';

@Controller()
export class DocConvertController {
  constructor(private readonly docConvertService: DocConvertService) {}

  @Post('/docx-to-pdf')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocxToPdf(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const newFilename = changeFilenameExtension(file.originalname, 'pdf');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${newFilename}"`,
    );

    const readableStream = await this.docConvertService.fromDocxToPdf(file);
    Readable.fromWeb(readableStream).pipe(res);
  }
}
