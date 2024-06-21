//importing mongoose
import mongoose from "mongoose";
// import validator from "validator"
//importing bcrypt
import bycript from 'bcrypt'
//importing jsonwebtoken
import jwt from 'jsonwebtoken'
//creating a new schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your name"],
    maxLength: [30, "Name should be 30 char long only"],
    minLength: [4, "Name should atleast 4 char"],
  },
  email: {
    type: String,
    required: [true, "Please enter Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter the password"],
    minLength: [4, "password should be greather than  4 char"],
  },

});

//adding data to database
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
next();
    }
    this.password= await bycript.hash(this.password,10);
} )


//JWT TOKEN

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},"shakirOone",{
        expiresIn:'1d',
    })
}

//compare password

userSchema.methods.comparePassword=async function(enterPassword){
    return  await bycript.compare(enterPassword,this.password);
}

//creating new database model
const UserSchema=mongoose.model("User",userSchema);
export default UserSchema;