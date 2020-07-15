import { container } from 'tsyringe'

import IMailTemplateProvider from './models/IMailTemplateProvider'
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider'

const provider = {
    handlebars: HandlebarsMailTemplateProvider,
}

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    provider.handlebars,
)


