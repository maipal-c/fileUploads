import { S3Service } from '../s3.service';
import { Request } from 'express';
export declare class FilesController {
    private readonly s3Service;
    constructor(s3Service: S3Service);
    uploadFile(files: Request['files']): Promise<string>;
}
