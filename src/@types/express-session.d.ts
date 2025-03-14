import 'express-session'

declare module 'express-session' {
    interface SessionData {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cart: Array<any> // Adjust the type based on your cart structure
    }
}
