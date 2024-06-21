
import UserSchema from "../model/user.schema.js";

export default class UserController {
 // main route
  homeLogin = (req, res) => {
    res.render("login");
  };
 //register route
  register = (req, res) => {
    res.render("register");
  };

   //user register here
  signUp = async (req, res, next) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
     
      const user = await UserSchema.create({
        name,
        password,
        email,
      });
      return res.status(200).json({
        success: true,
        data: user,
      });
    
    } catch (err) {
      next(err);
    }
  };
   //user login here
  signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserSchema.findOne({ email });
    console.log("user ",user);

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
//comparing hashed password
    let match = await user.comparePassword(password);
    console.log("your match",match)
    if (!match) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
//using JWTToken
    const token = await user.getJWTToken();

    return res.status(200).json({
        message:"login successful",
        user:user,
        token
    })
  };
}
