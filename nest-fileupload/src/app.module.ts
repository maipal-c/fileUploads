import { Module } from '@nestjs/common';
import { FilesController } from './files/files.controller';
// import { MulterModule } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // MulterModule.register({
    //   dest: './uploads',
    // }),
    ConfigModule.forRoot(),
  ],

  controllers: [FilesController],
  providers: [S3Service],
})
export class AppModule {}
