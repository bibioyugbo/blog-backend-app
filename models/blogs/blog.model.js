const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const blogSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            unique: true,
        },
        description:{
            type:String,
            required: false, 
        },
        author:{
            type:String,
            required: true,
        },
        author_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true
        }, 
        state: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
        read_count:{
            type: Number,
            default: 0,
        },
        reading_time:{
            type: String,
            default: '0 min read',
        },
        tags:{
            type: String,
            default: 'general', 
        },
        body:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;