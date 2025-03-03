import app from './app'
import config from './config'
import mongoose from 'mongoose'

async function main() {
    try {
        await mongoose.connect(config.db_uri as string)
        console.log('database connected')
        app.listen(config.port, () =>
            console.log('portfolio running', `http://localhost:${config.port}`)
        )
    } catch (error) {
        console.error('failed to connect', error)
    }
}

main()
