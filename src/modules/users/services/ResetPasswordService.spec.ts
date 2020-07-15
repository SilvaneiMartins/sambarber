import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository'
import FakeHashRepository from '../providers/HashProvider/fakes/FakeHashProvider'
import ResetPasswordService from './ResetPasswordService'


let fakeUsersRepository: FakeUsersRepository
let fakeUserTokenRepository: FakeUserTokensRepository
let resetPassword: ResetPasswordService
let fakeHashProvider: FakeHashRepository

describe('ResetPasswordService', () => {
   beforeEach(() => {
      fakeUsersRepository = new FakeUsersRepository()
      fakeUserTokenRepository = new FakeUserTokensRepository()
      fakeHashProvider = new FakeHashRepository()

      resetPassword = new ResetPasswordService(
         fakeUsersRepository,
         fakeUserTokenRepository,
         fakeHashProvider,
      )
   })

   //1° Teste
   it('Resetando o seu password.', async () => {
      const user = await fakeUsersRepository.create({
         name: 'Silvanei Martins',
         email: 'suporte@silvaneimartins.com.br',
         password: '123456',
      })
      const { token } = await fakeUserTokenRepository.generate(user.id)
      const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')
      await resetPassword.execute({
         password: '123456789',
         token,
      })
      const updatedUser = await fakeUsersRepository.findById(user.id)
      expect(generateHash).toHaveBeenCalledWith('123456789')
      expect(updatedUser?.password).toBe('123456789')
   })

   //2° Teste
   it('Não pode recuperar o seu password token inexiste.', async () => {
      await expect(
         resetPassword.execute({
            token: 'non-existing-token',
            password: '123456789',
         })
      ).rejects.toBeInstanceOf(AppError)
   })

   //3° Teste
   it('Não pode recuperar o seu password do usuário inexistente.', async () => {
      const { token } = await fakeUserTokenRepository.generate('non-existing-user')
      await expect(
         resetPassword.execute({
            token,
            password: '123456789',
         })
      ).rejects.toBeInstanceOf(AppError)
   })

   //4° Teste
   it('Não pode resetar o seu password apos 2hs do token gerado.', async () => {
      const user = await fakeUsersRepository.create({
         name: 'Silvanei Martins',
         email: 'suporte@silvaneimartins.com.br',
         password: '123456',
      })
      const { token } = await fakeUserTokenRepository.generate(user.id)
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
         const customDate = new Date()
         return customDate.setHours(customDate.getHours() + 3)
      })
      await expect(
         resetPassword.execute({
            password: '123456789',
            token,
         })
      ).rejects.toBeInstanceOf(AppError)
   })
})
