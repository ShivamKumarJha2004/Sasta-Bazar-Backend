import dotenv from "dotenv"
dotenv.config()

export const PORT=process.env.PORT || 3000
export const Cookies_Password=process.env.Cookies_Password || "your-secure-random-password-1234567890abcd"