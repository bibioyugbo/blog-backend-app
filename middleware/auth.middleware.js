const jwt = require('jsonwebtoken');
const User = require('../models/users/user.model'); 


const authenticateUser = async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("first_name email");


    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
}catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
}


}

module.exports={
    authenticateUser
}