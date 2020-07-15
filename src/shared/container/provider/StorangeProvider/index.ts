import { container } from 'tsyringe'

import uploadConfig from '@config/upload'
import IStorageProvider from './models/IStorageProvider'
import DiskStorageProvider from './implementations/DiskStorageProvider'
import S3StorangeProvider from './implementations/S3StorangeProvider'

const providers = {
    disk: DiskStorageProvider,
    s3: S3StorangeProvider,
}

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    providers[uploadConfig.driver],
)


