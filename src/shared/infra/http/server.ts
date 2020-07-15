import 'reflect-metadata'
import 'dotenv/config'

import express, {
    Request,
    Response,
    NextFunction
} from 'express'
import { errors } from 'celebrate'
import 'express-async-errors'
import cors from 'cors'

import uploadConfig from '@config/upload'
import rateLimiter from './middleware/RateLimiter'
import AppError from '@shared/errors/AppError'
import routes from '@shared/infra/http/routes'

import '@shared/infra/typeorm'
import '@shared/container'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(rateLimiter)

app.use(errors())

app.use((e: Error, request: Request, response: Response, next: NextFunction) => {
    if (e instanceof AppError) {
        return response.status(e.statusCode).json({
            status: e.statusCode,
            message: e.message,
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error!',
    })
})

app.listen(3333, () => {
    console.log('Servidor GoBarber esta online...')
})
