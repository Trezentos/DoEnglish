import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import aws, { S3 } from 'aws-sdk';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'us-east-1',
        });
    }

    public async saveFile(file: string): Promise<string> {
        const originalPath = path.resolve(uploadConfig.tmpFolder, file);

        const fileContent = fs.promises.readFile(originalPath, {
            encoding: 'utf-8',
        });

        await this.client
            .putObject({
                Bucket: 'app-doenglish',
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
            })
            .promise();
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }
        await fs.promises.unlink(filePath);
    }
}

export default DiskStorageProvider;
