import AppError from '@shared/errors/AppError'

import FakeStorageProvider from '@shared/container/provider/StorangeProvider/fakes/FakeStorageProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService'

describe('UpdateUserAvatar', () => {
   //1° Teste
   it('Deve ser capaz de criar um novo usuário.', async () => {
      const fakeUsersRepository = new FakeUsersRepository()
      const fakeStorageProvider = new FakeStorageProvider()
      const updateUserAvatar = new UpdateUserAvatarService(
         fakeUsersRepository,
         fakeStorageProvider,
      )
      const user = await fakeUsersRepository.create({
         name: 'Jhon Doe',
         email: 'suporte@jhondoe.com.br',
         password: '123456',
      })
      await updateUserAvatar.execute({
         user_id: user.id,
         avatarFilename: 'avatar.jpg',
      })
      await expect(user.avatar).toBe('avatar.jpg')
   })

   //2° Teste
   it('Não poder atualizar o avatar de um usuário inexistente.', async () => {
      const fakeUsersRepository = new FakeUsersRepository()
      const fakeStorageProvider = new FakeStorageProvider()
      const updateUserAvatar = new UpdateUserAvatarService(
         fakeUsersRepository,
         fakeStorageProvider,
      )
      await expect(
         updateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatarFilename: 'avatar.jpg',
         })
      ).rejects.toBeInstanceOf(AppError)
   })

   //3° Teste
   it('Excluir o avatar antigo antes de atualizar um novo avatar.', async () => {
      const fakeUsersRepository = new FakeUsersRepository()
      const fakeStorageProvider = new FakeStorageProvider()

      const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

      const updateUserAvatar = new UpdateUserAvatarService(
         fakeUsersRepository,
         fakeStorageProvider,
      )
      const user = await fakeUsersRepository.create({
         name: 'Jhon Doe',
         email: 'suporte@jhondoe.com.br',
         password: '123456',
      })
      await updateUserAvatar.execute({
         user_id: user.id,
         avatarFilename: 'avatar.jpg',
      })
      await updateUserAvatar.execute({
         user_id: user.id,
         avatarFilename: 'avatar2.jpg',
      })
      expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
      expect(user.avatar).toBe('avatar2.jpg')
   })
})
