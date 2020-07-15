import AppError from '@shared/errors/AppError'
import FakesNotificationsRepository from '@modules/notifications/repositories/fakes/FakesNotificationsRepository'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import FakeCacheProvider from '@shared/container/provider/CacheProvider/fakes/FakeCacheProvider'
import CreatAppointmentService from './CreateAppontmentService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakesNotificationsRepository: FakesNotificationsRepository
let fakesCacheProvider: FakeCacheProvider
let creatAppointment: CreatAppointmentService

describe('CreatAppointment', () => {
   beforeEach(() => {
      fakeAppointmentsRepository = new FakeAppointmentsRepository()
      fakesNotificationsRepository = new FakesNotificationsRepository()
      fakesCacheProvider = new FakeCacheProvider()

      creatAppointment = new CreatAppointmentService(
         fakeAppointmentsRepository,
         fakesNotificationsRepository,
         fakesCacheProvider,
      )
   })

   // 1° Teste
   it('Deve ser capaz de criar um novo agendamento.', async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
         return new Date(2020, 4, 10, 12).getTime()
      })

      const appointment = await creatAppointment.execute({
         date: new Date(2020, 4, 10, 13),
         user_id: 'user',
         provider_id: '123123',
      })

      expect(appointment).toHaveProperty('id')
      expect(appointment.provider_id).toBe('123123')
   })

   // 2° Teste
   it('Não pode criar dois agendamento no mesmo horário.', async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
         return new Date(2020, 4, 10, 12).getTime()
      })
      const appointmentDate = new Date(2020, 4, 10, 14)
      await creatAppointment.execute({
         date: appointmentDate,
         user_id: 'user',
         provider_id: '123123',
      })
      await expect(
         creatAppointment.execute({
            date: appointmentDate,
            user_id: 'user',
            provider_id: '123123',
         }),
      ).rejects.toBeInstanceOf(AppError)
   })

   // 3° Teste
   it('Should not be able to createan appointment on a past date.', async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
         return new Date(2020, 4, 10, 12).getTime()
      })
      await expect(
         creatAppointment.execute({
            date: new Date(2020, 4, 10, 11),
            user_id: 'user',
            provider_id: '123123',
         }),
      ).rejects.toBeInstanceOf(AppError)
   })

   // 4° Teste
   it('Should not be able to create an appointment with same user as provider.', async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
         return new Date(2020, 4, 10, 12).getTime()
      })
      await expect(
         creatAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            user_id: 'user',
            provider_id: 'user',
         }),
      ).rejects.toBeInstanceOf(AppError)
   })

   // 5° Teste
   it('Should not be able to create an appointment before 6am and after 8pm.', async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
         return new Date(2020, 4, 10, 12).getTime()
      })
      await expect(
         creatAppointment.execute({
            date: new Date(2020, 4, 11, 6),
            user_id: 'user',
            provider_id: 'provider',
         }),
      ).rejects.toBeInstanceOf(AppError)

      await expect(
         creatAppointment.execute({
            date: new Date(2020, 4, 11, 20),
            user_id: 'user',
            provider_id: 'provider',
         }),
      ).rejects.toBeInstanceOf(AppError)
   })
})
