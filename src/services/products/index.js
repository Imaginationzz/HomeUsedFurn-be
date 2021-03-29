const express = require("express")
const multer=require("multer")
const{CloudinaryStorage}=require("multer-storage-cloudinary")
const q2m = require("query-to-mongo")
const { authenticate } = require("../auth/tools")
const { authorize } = require("../auth/middlewares")
const cloudinary = require("../../cloudinary")
const productsModel = require("./schema")

const productsRouter = express.Router()

const storage = new CloudinaryStorage({

  cloudinary: cloudinary,
  
  params: {
  
  folder: "usedhomefurn",
  
  },
  
  })
  
  const cloudinaryMulter = multer({ storage: storage })

productsRouter.post("/addprod", cloudinaryMulter.single("image"),async (req, res, next) => {
  try {
   const objectAdded={
      ...req.body,
      image:req.file.path,
    }
    const newProd = new productsModel(objectAdded)
    const { _id } = await newProd.save()

    res.status(201).send(_id)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
productsRouter.get("/", async (req, res, next) => {
  try {
   
    const products = await productsModel.find()
    res.send(products)
  } catch (error) {
    next(error)
  }
})
productsRouter.get("/:id", async (req, res, next) => {
  try {
   
    const product = await productsModel.findOne({_id:req.params.id})
    res.send(product)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
module.exports = productsRouter