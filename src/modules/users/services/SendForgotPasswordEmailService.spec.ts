import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository'
import FakeMailProvider from '@shared/container/provider/MailProvider/fakes/FakeMailProvider'

let fakeUsersRepository: FakeUsersRepository
let fakeMailProvider: FakeMailProvider
let fakeUserTokenRepository: FakeUserTokensRepository
let sendForgotPasswordEmail: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
   beforeEach(() => {
      fakeUsersRepository = new FakeUsersRepository()
      fakeMailProvider = new FakeMailProvider()
      fakeUserTokenRepository = new FakeUserTokensRepository()

      sendForgotPasswordEmail = new SendForgotPasswordEmailService(
         fakeUsersRepository,
         fakeMailProvider,
         fakeUserTokenRepository,
      )
   })

   //1° Teste
   it('Recuperando sua senha informando o e-mail.', async () => {
      const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')
      const user = await fakeUsersRepository.create({
         name: 'Silvanei Martins',
         email: 'suporte@silvaneimartins.com.br',
         password: '123456',
      })
      await sendForgotPasswordEmail.execute({
         email: 'suporte@silvaneimartins.com.br',
      })
      expect(sendMail).toHaveBeenCalled()
   })

   //2° Teste
   it('Não pode recuperar a senha de um usuário não existente.', async () => {
      await expect(
         sendForgotPasswordEmail.execute({
            email: 'suporte@silvaneimartins.com.br',
         })
      ).rejects.toBeInstanceOf(AppError)
   })

   //3° Teste
   it('Não pode recuperar a senha de um usuário não existente.', async () => {
      const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate')
      const user = await fakeUsersRepository.create({
         name: 'Silvanei Martins',
         email: 'suporte@silvaneimartins.com.br',
         password: '123456',
      })
      await sendForgotPasswordEmail.execute({
         email: 'suporte@silvaneimartins.com.br',
      })
      expect(generateToken).toHaveBeenCalledWith(user.id)
   })
})
