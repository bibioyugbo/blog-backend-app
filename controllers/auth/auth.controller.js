const User = require('../../models/users/user.model');
const Blog = require('../../models/blogs/blog.model');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

const JWT_SECRET = process.env.JWT_SECRET; 
const JWT_EXPIRES_IN = '1 hour'; 

const createToken=(user)=>{
    return jwt.sign({id: user._id}, JWT_SECRET, {
           expiresIn: JWT_EXPIRES_IN
    }); 
}

const signup = async (req, res)=>{
    const { first_name, last_name, email, password } = req.body;
    try{
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({message:"This email is already registered"})
        }
        else {
              const user = await User.create({ first_name,last_name, email, password });
              const token = createToken(user);
              res.status(201).json({ message: "Signup successful!", user: { id: user._id, name: user.first_name }, token });
        }


    }catch(err){
        res.status(500).json({ message: err.message });
    }

}

const signin = async(req,res)=>{
    const { email, password } = req.body;
    try{
       const user = await User.findOne({email});
       if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = createToken(user)
    res.status(200).json({
      user: {message: "Login successful!", id: user._id, name: user.first_name },
      token
    });

    }catch(err){
        res.status(500).json({ message: err.message });
    }

}

module.exports ={
    signup,
    signin
}