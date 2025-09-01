import bcryptjs from 'bcryptjs'
import User from "../models/user.Model.js";

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
        return res.status(201).json('signup successful');
    } catch (error) {
        next(error)
    }
};