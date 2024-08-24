const User = require("../../models/User");
const CustomError = require("../../errors/CustomError");

const getProfile = async(req,res,next)=>{
       try {
           const userId= req.user.id;
           const user = await User.findById(userId)
                                  .select('-password');
           if(!user){
                return next(new CustomError('User not found!!',404));
           }
           res.status(200).json({user:user})

       } catch (err) {
           next(new CustomError(err.message,500));   
       }
}


const getAllUsers = async (_req, res, next) => {
  try {
      const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
      if (users.length === 0) {
          return next(new CustomError('No user found!!', 404));
      }
      res.status(200).json(users);
  } catch (err) {
      next(new CustomError(err.message, 500));
  }
};

const getSingleUser = async (req,res,next) => {
    try {
      const userId = req.params.id;
      const users = await User.find({_id:userId});
      if(!users){
          return next(new CustomError('No user found!!',404))
      }
      res.status(200).json(users);
    } catch (err) {
       next(new CustomError(err.message,500))
    }
};


const updateUserRole = async (req, res) => {
    try {
      const userId = req.params.id;
      const newRole = req.body.role;
      console.log(newRole);
      if (!newRole || !['student', 'moderator', 'admin'].includes(newRole)) {
        return res.status(400).json({ message: 'Invalid role' });
      }
  
      const user = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true }); // Return updated user
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({mesage:'User updated successful',user});
    } catch (err) {
      handleError(err, res);
    }
  };

  const deleteUser = async (req,res,next) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return  next(new CustomError('User not found',404));
      }
      res.status(200).json({ message: 'User deleted' });
    } catch (err) {
       next(new CustomError(err.mesage,500))
    }
  };




module.exports = {
    getProfile,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser
}