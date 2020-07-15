import { injectable, inject } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/User'
import ICacheProvider from '@shared/container/provider/CacheProvider/models/ICacheProvider'

interface IRequest {
    user_id: string
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('CacheProvider')
        private cacheProvier: ICacheProvider,
    ) { }

    public async execute({ user_id }: IRequest): Promise<User[]> {
        let users = await this.cacheProvier.recover<User[]>(`providers-list:${user_id}`)

        if (!users) {
            users = await this.usersRepository.findAllProvider({
                except_user_id: user_id
            })

            await this.cacheProvier.save(`providers-list:${user_id}`, users)
        }
        return users
    }
}

export default ListProvidersService
