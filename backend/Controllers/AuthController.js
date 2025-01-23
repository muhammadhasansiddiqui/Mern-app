const bcrypt = require("bcrypt");
const UserModel = require("../Models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists you can login",
        success: false,
      });
    }
    const userModle = new UserModel({ name, email, password });
    userModle.password = await bcrypt.hash(password, 10);
    await userModle.save();
    res.status(201).json({
      message: "signup successfully ",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


const login = async (req, res) => {
    try {
      const {email, password } = req.body;
      const user = await UserModel.findOne({ email });
      const errorMsg = 'Auth failed email or password is incorrect';  
      if (!user) {
        return res.status(403).json({
          message: errorMsg,
          success: false,
        });
      }
      
const ispassEql = await bcrypt.compare(password, user.password);
      if (!ispassEql) {
        return res.status(403).json({
          message: errorMsg,
          success: false,
        });
      }

      const jwtToken = jwt.sign(
        { email: user.email, 
            _id: user._id             
        
        },
         process.env.JWT_SECRET, 
         { expiresIn: '100h' }); 



      res.status(200).json({
        message: " Login success ",
        success: true,
        name: user.name,
        email,
        jwtToken,
       


      });


          } catch (error) {
      res.status(500)
      .json({
        message: "Internal server error",
        success: false,
      });
    }
  };



module.exports = {
  signup,
  login
};
