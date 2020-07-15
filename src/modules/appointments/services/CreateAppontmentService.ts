import { startOfHour, isBefore, getHours, format } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICacheProvider from '@shared/container/provider/CacheProvider/models/ICacheProvider'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import Appointment from '../infra/typeorm/entities/Appointment'
import AppError from '@shared/errors/AppError'

interface IRequest {
    provider_id: string
    user_id: string
    date: Date
}

@injectable()
class CreateAppointmentservice {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,

        @inject('CacheProvider')
        private cacheProvier: ICacheProvider,
    ) { }

    public async execute({ provider_id, user_id, date }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date)

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError("You can't create an appointment on a past date.")
        }

        if (user_id === provider_id) {
            throw new AppError("You can't create an appointment with yourself.")
        }

        if (getHours(appointmentDate) < 7 || getHours(appointmentDate) > 20) {
            throw new AppError('You can only create an appointments between 7am and 8pm.')
        }

        const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
            provider_id,
        )

        if (findAppointmentsInSameDate) {
            throw new AppError('Este compromisso já está reservado!')
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate
        })

        const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'")
        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para ${dateFormated}`,
        })

        await this.cacheProvier.invalidate(`provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`)

        return appointment
    }
}

export default CreateAppointmentservice
