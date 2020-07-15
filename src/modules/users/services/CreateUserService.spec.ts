import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import CreatUserService from './CreateUserService'
import FakeCacheProvider from '@shared/container/provider/CacheProvider/fakes/FakeCacheProvider'

describe('CreatUser', () => {
   it('Deve ser capaz de criar um novo usuário.', async () => {
      const fakeUsersRepository = new FakeUsersRepository()
      const fakeHashProvider = new FakeHashProvider()
      const fakeCacheProvider = new FakeCacheProvider()

      const createUser = new CreatUserService(
         fakeUsersRepository,
         fakeHashProvider,
         fakeCacheProvider,
      )

      const user = await createUser.execute({
         name: 'Jhon Doe',
         email: 'suporte@jhondoe.com.br',
         password: '123456',
      })

      expect(user).toHaveProperty('id')
   })

   it('Não deve ser capaz de criar um novo usuário com o mesmo email.', async () => {
      const fakeHashProvider = new FakeHashProvider()
      const fakeUsersRepository = new FakeUsersRepository()
      const fakeCacheProvider = new FakeCacheProvider()

      const createUser = new CreatUserService(
         fakeUsersRepository,
         fakeHashProvider,
         fakeCacheProvider,
      )

      await createUser.execute({
         name: 'Jhon Doe',
         email: 'suporte@jhondoe.com.br',
         password: '123456',
      })

      await expect(
         createUser.execute({
            name: 'Jhon Doe',
            email: 'suporte@jhondoe.com.br',
            password: '123456',
         })
      ).rejects.toBeInstanceOf(AppError)
   })
})
