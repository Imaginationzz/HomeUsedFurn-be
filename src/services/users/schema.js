const{Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new Schema({
firstName:{ 
    type:String,
    required:true,
    trim:true,
    min:3,
    max:20
},
lastName:{ 
    type:String,
    required:true,
    trim:true,
    min:3,
    max:20
},
userName:{ 
    type:String,
    required:true,
    trim:true,
    unique:true,
    index:true,
    lowercase:true,
    min:3,
    max:20
},
email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
    lowercase:true
},
password:{ 
    type:String,
    required:true
},
role:{ 
    type:String,
    enum:["user","admin"],
    default:"user"
},

contactNumber:{
    type:String,
},
profilePicture:{
    type:String
},

    
},
{timestamps: true})

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email })
  
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) return user
      else return null
    } else return null
  }
  
  userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
  
    delete userObject.password
    delete userObject.__v
  
    return userObject
  }
  
  userSchema.pre("save", async function (next) {
    const user = this
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 10)
    }
    next()
  })
  module.exports = model("user", userSchema)