const{Schema, model} = require("mongoose");
const orderSchema = new Schema({
    orderItems:[{
        name:{type: String},
        Quantity:{type: Number},
        image:{type: String},
        price:{type: Number},
        product:{type:Schema.Types.ObjectId,ref :"product"},


    }],
    shippingAdress:{
        fullName:{type: String},
        adress:{type: String},
        city:{type: String},
        country:{type: String},
        postalCode:{type: Number},
        
    },
    paymentMethod:{type: String},
    /*user:{type:Schema.Types.ObjectId,ref :"user"},*/

},{timestamps: true})
module.exports = model("order", orderSchema)