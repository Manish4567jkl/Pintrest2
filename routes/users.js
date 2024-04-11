const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/Pintrest2")
const plm = require('passport-local-mongoose')
const userSchema = new mongoose.Schema({
  username : String,
  name : String ,
  email : String,
  password : String,
  profileImage : String,
  contact : Number,
  boards :{ 
    type : Array,
    default : []
  },
})
userSchema.plugin(plm)
module.exports = mongoose.model("user" , userSchema)