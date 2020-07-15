import IParseMailTemplateDTO from '@shared/container/provider/MailTemplateProvider/dtos/IParseMailTemplateDTO'

interface IMailContact {
   name: string
   email: string
}

interface ISendMailDTO {
   to: IMailContact
   from?: IMailContact
   subject: string
   templateData: IParseMailTemplateDTO
}

export default ISendMailDTO
