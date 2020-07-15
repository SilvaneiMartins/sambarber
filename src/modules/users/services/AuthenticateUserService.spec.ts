import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'
import FakeCacheProvider from '@shared/container/provider/CacheProvider/fakes/FakeCacheProvider'

describe('AuthenticateUser', () => {
    // 1° Teste
    it('Deve ser capaz de autenticar.', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()
        const fakeCacheProvider = new FakeCacheProvider()

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        )
        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        )
        const user = await createUser.execute({
            name: 'Jhon Doe',
            email: 'suporte@jhondoe.com.br',
            password: '123456',
        })
        const response = await authenticateUser.execute({
            email: 'suporte@jhondoe.com.br',
            password: '123456',
        })
        expect(response).toHaveProperty('token')
        expect(response.user).toEqual(user)
    })

    // 2° Teste
    it('Não pode autenticar com usuários inexistentes.', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()
        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        )
        expect(
            authenticateUser.execute({
                email: 'suporte@jhondoe.com.br',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(AppError)
    })

    // 3° Teste
    it('Não pode autenticar com password errado.', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()
        const fakeCacheProvider = new FakeCacheProvider()

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        )
        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        )
        await createUser.execute({
            name: 'Jhon Doe',
            email: 'suporte@jhondoe.com.br',
            password: '123456',
        })
        await expect(
            authenticateUser.execute({
                email: 'suporte@jhondoe.com.br',
                password: 'wrong-password',
            })
        ).rejects.toBeInstanceOf(AppError)
    })
})
