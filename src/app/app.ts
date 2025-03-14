import express from 'express'
import cors from 'cors'
import globalErrorHandler from './helpers/globalErrorHandler'
import handleNotFound from './helpers/handleNotFound'
import morgan from 'morgan'
import router from './router'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import config from './config'
const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(
    session({
        secret: config.jwt_secret || 'secret-key',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: config.db_uri, // MongoDB URL
            collectionName: 'sessions', // Name of the collection to store sessions
            ttl: 30 * 24 * 60 * 60, // 30 days in seconds
        }),
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
            secure: process.env.NODE_ENV === 'production', // Secure cookies in production
            httpOnly: true, // Prevents XSS attacks
        },
    })
)
app.use('/api', router)
app.get('/session', async (req, res) => {
    console.log(req.session) // This will log the session data
    res.send(req.session.id)
})

app.get('/', (req, res) => {
    res.status(200).json({ message: 'application is running' })
})
app.use(handleNotFound)
app.use(globalErrorHandler)

export default app
