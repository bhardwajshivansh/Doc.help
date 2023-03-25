const userModel= require('../models/userModels')
const bcrypt = require('bcryptjs')

const LoginController = () => {}
//register callback
const registerController = async(req,res) => {
    try {
        const existingUser =await userModel.findOne({email:req.body.email});
        if(existingUser){
            return res.status(200).send({message:'User Already Exists!',success:false});
        }
      const password  =req.body.password;
      const salt =await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password,salt);
      req.body.password =hashedpassword;
      const newUser= new userModel(req.body);
      await newUser.save();
      res.status(201).send({message:'Registered Succesfully',success:true});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:'Register Controller ${error.message}',})
        
    }

}

module.exports = {
    LoginController,registerController
};
