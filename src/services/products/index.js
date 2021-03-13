const express = require("express")
const q2m = require("query-to-mongo")
const { authenticate } = require("../auth/tools")
const { authorize } = require("../auth/middlewares")

const productsModel = require("./schema")

const productsRouter = express.Router()

productsRouter.get("/", async (req, res, next) => {
  try {
   
    const products = await productsModel.find()
    res.send(products)
  } catch (error) {
    next(error)
  }
})
productsRouter.post("/addprod", async (req, res, next) => {
  try {
    const newProd = new productsModel(req.body)
    const { _id } = await newProd.save()

    res.status(201).send(_id)
  } catch (error) {
    next(error)
  }
})
module.exports = productsRouter