const User = require('../../models/users/users.model');

const CreateUser = async({first_name,last_name, email, password})=>{
     const userData ={
        first_name,
        last_name,
        email,
        password    
    }
    try{
        const createUser = await User.create(userData)
        return createUser
    }catch(err){
        throw new Error('Failed to create user: ' + error.message);
    }
}

module.exports = {
    CreateUser
}