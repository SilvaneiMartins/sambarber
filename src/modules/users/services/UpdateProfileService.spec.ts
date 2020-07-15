import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateProfileService from './UpdateProfileService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {
   beforeEach(() => {
      fakeUsersRepository = new FakeUsersRepository()
      fakeHashProvider = new FakeHashProvider()

      updateProfile = new UpdateProfileService(
         fakeUsersRepository,
         fakeHashProvider,
      )
   })

   // 1° Teste
   it('O usuário deve poder atualizar seu email e senha.', async () => {
      const user = await fakeUsersRepository.create({
         name: 'Jhon Doe',
         email: 'suporte@jhondoe.com.br',
         password: '123456',
      })

      const updatedUser = await updateProfile.execute({
         user_id: user.id,
         name: 'Jhon Martins',
         email: 'johnmartins@jhondoe.com.br',
         old_password: '123456',
         password: '123456789',
      })
      expect(updatedUser.name).toBe('Jhon Martins')
      expect(updatedUser.email).toBe('johnmartins@jhondoe.com.br')
   })

   // 2° Teste
   it('Should not be able to change to another user email.', async () => {
      await fakeUsersRepository.create({
         name: 'Jhon Doe',
         email: 'suporte@jhondoe.com.br',
         password: '123456',
      })

      const user = await fakeUsersRepository.create({
         name: 'Teste',
         email: 'teste@jhondoe.com.br',
         password: '123456',
      })

      await expect(
         updateProfile.execute({
            user_id: user.id,
            name: 'Jhon Doe',
            email: 'suporte@jhondoe.com.br',
            old_password: '123456789',
            password: '123456789',
         })
      ).rejects.toBeInstanceOf(AppError)
   })

   // 3° Teste
   it('Should not be able to update the password.', async () => {
      const user = await fakeUsersRepository.create({
         name: 'Jhon Doe',
         email: 'suporte@jhondoe.com.br',
         password: '123456',
      })

      const updatedUser = await updateProfile.execute({
         user_id: user.id,
         name: 'Jhon Martins',
         email: 'johnmartins@jhondoe.com.br',
         old_password: '123456',
         password: '123456789',
      })
      expect(updatedUser.password).toBe('123456789')
   })

   // 4° Teste
   it('Should not be able to update the password without old password.', async () => {
      const user = await fakeUsersRepository.create({
         name: 'Jhon Doe',
         email: 'suporte@jhondoe.com.br',
         password: '123456',
      })

      await expect(
         updateProfile.execute({
            user_id: user.id,
            name: 'Jhon Martins',
            email: 'johnmartins@jhondoe.com.br',
            password: '123456789',
         })
      ).rejects.toBeInstanceOf(AppError)
   })

   // 5° Teste
   it('Should not be able to update the password with wrong old password.', async () => {
      const user = await fakeUsersRepository.create({
         name: 'Jhon Doe',
         email: 'suporte@jhondoe.com.br',
         password: '123456',
      })

      await expect(
         updateProfile.execute({
            user_id: user.id,
            name: 'Jhon Martins',
            email: 'johnmartins@jhondoe.com.br',
            old_password: '654321',
            password: '123456789',
         })
      ).rejects.toBeInstanceOf(AppError)
   })

   // 6° Teste
   it('Should be able update the profile from non-existing user.', async () => {
      await expect(
         updateProfile.execute({
            user_id: 'non-existing-user-id',
            name: 'non-existing-user',
            email: 'non-existing-user-email',
         })
      ).rejects.toBeInstanceOf(AppError)
   })
})
