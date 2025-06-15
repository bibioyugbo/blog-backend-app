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


module.exports = {
    CreateBlog,
}