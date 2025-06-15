const userService = require('../../services/users/user.service');

const CreateUserController = async (req, res)=>{
    try{
        const payload = req.body;
        const response = await userService.CreateUser({
            first_name: payload.first_name,
            last_name: payload.last_name,
            email: payload.email,
            password: payload.password
        })
        if(response){
            return res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: response
            })
        }

    }catch(err){
         return res.status(500).json({
            status: 'error',
            message: 'Failed to create user',
            error: error.message
        })
    }
}

module.exports ={
    CreateUserController
}