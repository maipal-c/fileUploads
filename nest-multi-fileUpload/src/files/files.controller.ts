import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../s3.service';
import { Request } from 'express';
@Controller('files')
export class FilesController {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'files[]',
        maxCount: 10,
      },
    ]),
  )
  async uploadFile(@UploadedFiles() files: Request['files']) {
    files['files[]']?.map(async (file: Express.Multer.File) => {
      console.log(file);
      await this.s3Service.uploadFileToS3(file);
    });
    return '';
  }
}
