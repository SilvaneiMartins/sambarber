import fs from 'fs'
import path from 'path'

import uploadConfig from '@config/upload'
import IStoranteProvider from '../models/IStorageProvider'

class DiskStorageProvider implements IStoranteProvider {

    // Função que salva um arquivo
    public async saveFile(file: string): Promise<string> {

        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadsFolder, file),
        )

        return file
    }

    // Função que deleta um arquivo
    public async deleteFile(file: string): Promise<void> {

        const filePath = path.resolve(uploadConfig.uploadsFolder, file)

        try {
            await fs.promises.stat(filePath)
        } catch (e) {
            return
        }

        await fs.promises.unlink(filePath)

    }
}

export default DiskStorageProvider
