export const getRandomOTP = (length) => {
    let otp = ''
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10) //0 -.99999999  * 10
    }
    return otp
}
