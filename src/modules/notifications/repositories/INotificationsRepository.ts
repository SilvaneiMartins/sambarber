import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO'
import Notifications from '../infra/typeorm/schemas/Notifications'

interface INotificationsRepository {
   create(data: ICreateNotificationDTO): Promise<Notifications>
}

export default INotificationsRepository
