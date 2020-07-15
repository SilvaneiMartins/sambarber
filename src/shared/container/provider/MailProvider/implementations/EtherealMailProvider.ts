import nodemailer, { Transporter } from 'nodemailer'
import { injectable, inject } from 'tsyringe'

import IMailTemplateProvider from '@shared/container/provider/MailTemplateProvider/models/IMailTemplateProvider'
import IMailProvider from '../models/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'

@injectable()
class EtherealMailProvider implements IMailProvider {
   private client: Transporter

   constructor(
      @inject('MailTemplateProvider')
      private emailTemplateProvider: IMailTemplateProvider,
   ) {
      nodemailer.createTestAccount()
      .then(account => {
         const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
               user: account.user,
               pass: account.pass
            }
         })
         this.client = transporter
      })
      .catch(err => err.message)
   }

   public async sendMail({ to, from, subject, templateData }:ISendMailDTO): Promise<void> {
      const message = await this.client.sendMail({
         from: {
            name: from?.name || 'Sam Security',
            address: from?.email || 'suporte@samsecurity.com.br',
         },
         to: {
            name: to.name,
            address: to.email,
         },
         subject,
         html: await this.emailTemplateProvider.parse(templateData),
      })

      console.log("Message sent: %s", message.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
   }
}

export default EtherealMailProvider
