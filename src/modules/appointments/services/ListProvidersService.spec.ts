import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/provider/CacheProvider/fakes/FakeCacheProvider'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ListProvidersService from './ListProvidersService'

let fakeUsersRepository: FakeUsersRepository
let listProvider: ListProvidersService
let fakeCacheProvider: FakeCacheProvider

describe('ListProvider', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeCacheProvider = new FakeCacheProvider()

        listProvider = new ListProvidersService(
            fakeUsersRepository,
            fakeCacheProvider,
        )
    })

    // 1° Teste
    it('Should be able to list the providers.', async () => {
        const Jhon1 = await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhonedoe@silvanei.com.br',
            password: '123456',
        })
        const Jhon2 = await fakeUsersRepository.create({
            name: 'Jhon Tre',
            email: 'jhonetre@silvanei.com.br',
            password: '123456',
        })
        const loggedUser = await fakeUsersRepository.create({
            name: 'Silvanei Martins',
            email: 'silvanei@silvanei.com.br',
            password: '123456',
        })
        const providers = await listProvider.execute({
            user_id: loggedUser.id,
        })
        expect(providers).toEqual([
            Jhon1,
            Jhon2,
        ])
    })
})
