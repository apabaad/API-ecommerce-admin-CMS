import express from 'express'
const Router = express.Router()

import {
    createPaymentOption,
    getAPaymentOption,
    getPaymentOptions,
    deletePaymentOption,
} from '../modals/payment-option/PaymentOptionModel.js'

Router.get('/', async (req, res) => {
    try {
        const result = await getPaymentOptions()
        res.json({
            status: 'success',
            message: 'to be updated',
            result,
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        })
    }
})

Router.post('/', async (req, res) => {
    try {
        const result = await createPaymentOption(req.body)
        res.json({
            status: 'success',
            message: 'Posted',
            result,
        })
    } catch (error) {
        console.log(error.message)

        res.json({
            status: 'error',
            message:
                'Error, unable to create new payment option, Please contact administration.',
        })
    }
})

Router.delete('/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const result = _id ? await deletePaymentOption(_id) : null
        res.json({
            status: 'success',
            message: 'to be updated',
            result,
        })
    } catch (error) {
        console.log(error.message)

        res.json({
            status: 'error',
            message:
                'Error, unable to delete the payment option, Please contact administration.',
        })
    }
})

export default Router
