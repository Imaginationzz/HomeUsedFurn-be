const{Schema, model} = require("mongoose");


const productsSchema = new Schema({
name:{ 
    type:String,
    required:true,
    trim:true,
   
    max:20
},
category:{ 
    type:String,
    required:true,
    trim:true,
   
    max:20
},
image:{ 
    type:String,
    required:true
},
    
price:{
    type:Number,
    required:true
    
},
countInStock:{ 
    type:Number,
    required:true
},
brand:{ 
    type:String
   
},

rating:{
    type:Number
},
numReviews:{
    type:Number
},

description:{ 
    type:String,
   
},
},
{timestamps: true})

module.exports = model("product", productsSchema)