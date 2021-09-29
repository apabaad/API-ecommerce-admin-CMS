import bcrypt from 'bcrypt'
const saltRound = 10

export const hashPassword = (plainPass) => {
    return bcrypt.hashSync(plainPass, saltRound)
}
export const verifyPassword = (plainPass, hasPassFromDB) => {
    return bcrypt.compareSync(plainPass, hasPassFromDB)
}
