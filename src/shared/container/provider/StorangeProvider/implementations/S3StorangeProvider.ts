import fs from 'fs'
import path from 'path'
import mine from 'mime'
import aws, { S3 } from 'aws-sdk'

import uploadConfig from '@config/upload'
import IStoranteProvider from '../models/IStorageProvider'

class S3StorangeProvider implements IStoranteProvider {
    private client: S3

    constructor() {
        this.client = new aws.S3({
            region: 'us-east-1',
        })
    }

    // Função que salva um arquivo
    public async saveFile(file: string): Promise<string> {
        const originalPath = path.resolve(uploadConfig.tmpFolder, file)

        const ContentType = mine.getType(originalPath)

        if (!ContentType) {
            throw new Error('File not found')
        }

        const fileContent = await fs.promises.readFile(originalPath)

        await this.client.putObject({
            Bucket: uploadConfig.config.aws.bucket,
            Key: file,
            ACL: 'public-read',
            Body: fileContent,
            ContentType,
            ContentDisposition: `inline; filename=${file}`,
        }).promise()

        await fs.promises.unlink(originalPath)
        return file
    }

    // Função que deleta um arquivo
    public async deleteFile(file: string): Promise<void> {
        await this.client.putObject({
            Bucket: 'app-sambarber',
            Key: file,
        }).promise()
    }
}

export default S3StorangeProvider
