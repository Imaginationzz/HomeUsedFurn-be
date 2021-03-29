const express = require("express")


const orderModel = require("./schema")

const orderRouter = express.Router()

orderRouter.post("/", async (req, res, next) => {
    //console.log(req.body.order.orderItems)
    try {
        if (req.body.order.orderItems.length === 0) {
            res.status(400).send("you did not order")
        } else {
            const newOrder = new orderModel(req.body.order)
            const { _id } = await newOrder.save()

            res.status(201).send(_id)
        }


    } catch (error) {
        console.log(error)
        next(error)
    }
})
module.exports = orderRouter