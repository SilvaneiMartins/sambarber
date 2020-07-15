import { Router } from 'express'

import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointmentsRoutes'
import providersRoutes from '@modules/appointments/infra/http/routes/providersRoutes'

import usersRoutes from '@modules/users/infra/http/routes/usersRoutes'
import sessionsRoutes from '@modules/users/infra/http/routes/sessionsRoutes'
import passwordRoutes from '@modules/users/infra/http/routes/passwordRoutes'
import profileRoutes from '@modules/users/infra/http/routes/profileRoutes'

const routes = Router()

routes.use('/appointments', appointmentsRoutes)
routes.use('/providers', providersRoutes)
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/password', passwordRoutes)
routes.use('/profile', profileRoutes)

export default routes
