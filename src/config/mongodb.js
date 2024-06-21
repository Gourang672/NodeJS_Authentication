//importing mongoose
import mongoose from "mongoose";
//assigning database url to url variable
const url = "mongodb+srv://gourangcharanmishra2001:ccxYfAwqC7Rdo1Wl@cluster0.ageetyg.mongodb.net/NodeAuth";

export const connectUsingMongoose = async () => {
  try {
    //connect to MongoDB
    await mongoose.connect(url);
    console.log("Mongodb connected using mongoose");
  } catch (err) {
    //catching error while connecting to MongoDB
    console.log("Error while connecting to db");
    console.log(err);
  }
};