import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })
const config = {
    env: 'development',
    port: process.env.PORT,
    db_uri: process.env.DB_URI,
    jwt_secret: process.env.JWT_SECRET,
}

export default config
