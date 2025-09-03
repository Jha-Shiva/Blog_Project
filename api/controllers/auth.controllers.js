import bcryptjs from 'bcryptjs'
import User from "../models/user.Model.js";
import jwt from 'jsonwebtoken'

export const userSignUp = async (req, res, next)=>{
    const { username, email, password, profilePicture, isAdmin } = req.body;
    //validate
    if (!username || !email || !password || username === '' || email === '' || password === '') return res.status(400).json({ error: 'Please provide required fields' });
    
    const hashedPassword = await bcryptjs.hash(password, 10)

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        profilePicture,
        isAdmin
    });
    
    try { 
        await newUser.save();
        return res.status(201).json({
            success: true,
            message:'Sign Up Successfull'
        });
    } catch (error) {
        next(error)
    }
};

export const userSignIn = async (req, res, next)=>{
    const { email, password } = req.body;
    //validation
    if(!email || !password || email === '' || password === '') return res.status(400).json({error: 'All fields are required!!!'});

    try {
        const validUser = await User.findOne({ email });
        if(!validUser){
            return res.status(404).json({success: false, error: 'user not found'})
        };
        //valid user password
        const validPassword = await bcryptjs.compare(password, validUser.password);
        if(!validPassword){
            return res.status(400).json({success: false , error: 'Invalid password !!!'})
        };

        //token generate
        const token = jwt.sign(
            { id: validUser._id, isAdmin: validUser.isAdmin },
            process.env.SECRET
        )

        //destructure here in rest variable password is not included
        const { password: pass, ...rest } = validUser._doc;
        
        //sending res and saving cookie to frontend
        res.status(200).cookie('access_token', token, {httpOnly: true}).json({
            success: true,
            rest,
        })
        
    } catch (error) {
        next(error)
    }
};