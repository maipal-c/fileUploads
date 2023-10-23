import { Injectable } from '@nestjs/common';
import { S3Client, S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class S3Service {
  private bucketName: string = 'self-hosted-binaries';
  private region: string = 'us-west-1';

  async uploadFileToS3(file: Express.Multer.File) {
    const upload = new Upload({
      client: new S3(new S3Client({ region: this.region })),
      params: {
        Bucket: this.bucketName,
        Key: `test-uploads/${file.originalname}`,
        Body: file.buffer,
      },
    });

    try {
      const res = await upload.done();
      console.log(res);

      return `File uploaded`;
    } catch (error) {
      throw error;
    }
  }
}
