const Blog = require('../../models/blogs/blog.model');


const CreateBlog = async({title, description, author, author_id, state, read_count, reading_time, tags, body})=>{
    let blogData ={
        title, 
        description,
        author,
        author_id,
        state,
        read_count,
        reading_time,
        tags,
        body
    }
    try {
        const createBlog = await Blog.create(blogData)
        return createBlog
    }catch(err){
        throw new Error('Failed to create Blog: ' + err.message);
    }
}

const UpdateBlog = async (blogId, data)=>{
     try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            data,
            { new: true }
        );   
    
        return updatedBlog;
    } catch (error) {
        throw new Error('Failed to update Blog: ' + error.message);
    }  
}


module.exports = {
    CreateBlog,
    UpdateBlog
}