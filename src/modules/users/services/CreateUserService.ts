import { injectable,inject } from 'tsyringe'

import User from '../infra/typeorm/entities/User'
import IUserRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import ICacheProvider from '@shared/container/provider/CacheProvider/models/ICacheProvider'
import AppError from '@shared/errors/AppError'

interface IRequest {
   name: string
   email: string
   password: string
}

@injectable()
class CreateUserService {
   constructor(
      @inject('UsersRepository')
      private usersRepository: IUserRepository,

      @inject('HashProvider')
      private  hashProvider: IHashProvider,

      @inject('CacheProvider')
      private cacheProvier: ICacheProvider,
   ) { }

   public async execute({ name, email, password }: IRequest): Promise<User> {
      const checkUserExists = await this.usersRepository.findByEmail(email)
      if (checkUserExists) {
         throw new AppError('O endereço de email já estão usando!')
      }
      const haspPassword = await this.hashProvider.generateHash(password)
      const user = await this.usersRepository.create({
         name,
         email,
         password: haspPassword,
      })

      await this.cacheProvier.invalidatePrefix('providers-list:*')

      return user
   }
}

export default CreateUserService
