const database = require('./config/database')
const env = require('dotenv');
const blogRouter = require ('./routes/blogs/blog.router')
const authRouter = require ('./routes/auth/auth.router')
const mongoose = require('mongoose');

env.config()

const PORT = process.env.PORT;


//connect to the database
database.connectDB().then(()=> {
      console.log("✅ Connected to DB:", mongoose.connection.name);
      const express = require('express')
        const app = express();
        app.use(express.json());


    app.use('/api/v1/blogs', blogRouter )
    app.use('/api/v1/auth', authRouter )

    app.get('/',(req,res)=>{
    res.send('Blog Api')
    })

    app.get('/health', (req,res)=>{
    res.send('OK')
    })

    app.listen(PORT, ()=>{
    console.log(`Server is running on  http://localhost:${PORT}`);
})


});
