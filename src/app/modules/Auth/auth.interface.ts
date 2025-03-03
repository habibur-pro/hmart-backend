export type TsignupPayload = {
    fullName: string
    password: string
    email?: string
    phone: string
}
export type TVerifySignInPayload = {
    email: string
    password: string
    phone: string
}
