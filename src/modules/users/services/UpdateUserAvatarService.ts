import { injectable, inject } from 'tsyringe'

import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUserRepository from '../repositories/IUsersRepository'
import IStorangeProvider from '@shared/container/provider/StorangeProvider/models/IStorageProvider'

interface IRequest {
    user_id: string
    avatarFileName: string
}

@injectable()
class UpdateUserAvatarService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('StorageProvider')
        private storageProvider: IStorangeProvider,
    ) { }

    public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {

        const user = await this.usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('Somente usuários autenticados podem alterar o avatar!', 401)
        }

        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar)
        }

        const filename = await this.storageProvider.saveFile(avatarFileName)
        user.avatar = filename
        await this.usersRepository.save(user)
        return user
    }
}

export default UpdateUserAvatarService
