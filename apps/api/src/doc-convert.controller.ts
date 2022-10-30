import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocConvertService } from './doc-convert.service';
import { changeFilenameExtension } from 'shared-helpers';

@Controller()
export class DocConvertController {
  constructor(private readonly docConvertService: DocConvertService) {}

  @Post('/from-docx-to-pdf')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocxToPdf(
    @UploadedFile() file: Express.Multer.File,
    @Res({ passthrough: true }) res: Response,
  ) {
    const newFilename = changeFilenameExtension(file.originalname, 'pdf');

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${newFilename}"`,
    });

    return await this.docConvertService.fromDocxToPdf(file);
  }
}
