import bcrypt from 'bcrypt'
const saltRound = 10

export const hashPassword = (plainPass) => {
    return bcrypt.hashSync(plainPass, saltRound)
}
