/// <reference types="multer" />
export declare class S3Service {
    private bucketName;
    private region;
    uploadFileToS3(file: Express.Multer.File): Promise<string>;
}
