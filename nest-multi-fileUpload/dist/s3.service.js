"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
let S3Service = class S3Service {
    constructor() {
        this.bucketName = 'self-hosted-binaries';
        this.region = 'us-west-1';
    }
    async uploadFileToS3(file) {
        const upload = new lib_storage_1.Upload({
            client: new client_s3_1.S3(new client_s3_1.S3Client({ region: this.region })),
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
        }
        catch (error) {
            throw error;
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)()
], S3Service);
//# sourceMappingURL=s3.service.js.map