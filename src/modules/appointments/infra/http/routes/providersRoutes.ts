import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ProviderController from '../controllers/ProviderController'
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'

const providerRouter = Router()

const providersController = new ProviderController()
const providersMonthAvailabilityController = new ProviderMonthAvailabilityController()
const providersDayAvailabilityController = new ProviderDayAvailabilityController()

providerRouter.use(ensureAuthenticated)

providerRouter.get('/',providersController.index)

providerRouter.get('/:provider-id/month-availability', celebrate({
   [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
   }
}),providersMonthAvailabilityController.index)

providerRouter.get('/:provider-id/day-availability', celebrate({
   [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
   }
}),providersDayAvailabilityController.index)

export default providerRouter
