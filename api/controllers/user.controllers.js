import User from '../models/user.Model.js';


export const profileUpdate = async (req, res, next)=>{
    let {username, email, password, profilePicture} = req.body;

    if(req.user.id !== req.params.userId){
        return res.status(403).json({success: false, message: 'You are not authorized to update this profile'});
    };

    if(req.body.password){
        if(password.length < 6){
            return res.status(400).json({success: false, message: 'Password must be grater than 6 characters'});
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        password = hashedPassword;
    };

    if(username){
        if(username.length <7 || username.length >20){
            return res.status(400).json({success: false, message: 'Username must be between 7 to 20 characters'});
        }
    }

    if(username.includes(' ')){
        return res.status(400).json({success: false, message: 'Username should not contain spaces'});
    }

    if(username !== username.toLowerCase()){
        return res.status(400).json({success: false, message: 'Username should be in lowercase'});
    }

    if(!username.match(/^[a-zA-Z0-9]+$/)){
        return res.status(400).json({success: false, message: 'Username should not contain special characters'});
    }

    try {
        //find user by id
        const user = await User.findById(req.params.userId)
        if(!user) return res.status(404).json({message: 'User not found'});
        //update user
        // user.username = username;
        // user.email = email;
        // user.password = password;
        // user.profilePicture = profilePicture;

        const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
            $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
            },
        },
        { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json({message: 'Profile updated successfully', rest});
        

        
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next)=>{
    if(!req.user.isAdmin && String(req.user.id) !== String(req.params.userId)){
        return res.status(403).json({success: false, message: 'You are not authorized to delete this account'});
    };

    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if(!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json({ success: true, message: 'User deleted successfully'});
    } catch (error) {
        next(error);
    }
};

export const signOut = async (req, res, next)=>{
    try {
        res
        .clearCookie('access_token')
        .status(200)
        .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next( {status:403 ,message:'You are not allowed to see all users'});
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      totalUsers,
      lastMonthUsers,
      users: usersWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};