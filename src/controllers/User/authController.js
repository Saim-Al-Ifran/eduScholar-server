const bcrypt = require('bcrypt');
const User = require('../../models/User');
const CustomError = require('../../errors/CustomError');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../secret');

const userRegisterController  = async(req,res,next)=>{
    try{
             const userData = req.body;
             console.log(userData);
             const user  = await User.findOne({email: userData.email});
             if(user){
                    return next(new CustomError('User already exists with this email',403));    
             }
             const saltRounds = 10;
             const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

             const newUser = new User({
                ...userData,
                 password:hashedPassword,
                 
             });
             await newUser.save();

             const responseUser = {
                username: newUser.name,
                email: newUser.email,
                role: newUser.role,  
              };

             res.status(200).json({message:'User registered succefully',responseUser}); 

    }catch(err){
            next(new CustomError(err.message,500));
    }
}



const loginController = async(req,res,next)=>{
    const{email,password} = req.body
   
    try {
           const user = await User.findOne({ email: { $regex: new RegExp(email, 'i') } });
                     
           if(!user){
                 return next(new CustomError('Invalid Credential',403))
           }
           if(user.role  === 'user'){
               return next(new CustomError('Access Denied: Regular users are not authorized to perform this action.',403))
           }
           const isMatch = await bcrypt.compare(password,user.password);
           if(!isMatch){
                 return next(new CustomError('Invalid Credential',403));
           }
   
           const payload = {
               id:user.id,
               name:user.name,
               email:user.email,
               role:user.role
           }
   
           const token = jwt.sign(payload,secretKey,{expiresIn:'1hr'});
           res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
           if(!token){
                return next(new CustomError('Failed to generate token'));
           }
   
           return res.status(202).json({
            user:{
                name:user.name,
                email:user.email
              },
             token
        });

    } catch (err) {
          next(new CustomError(err.message,500));
    }
}

const logoutController =  (_req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out successfully' });
};





module.exports = {
    userRegisterController,
    loginController,
    logoutController,
}