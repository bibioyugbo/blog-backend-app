const blogService = require('../../services/blogs/blog.service')
const Blog  = require('../../models/blogs/blog.model')


const createBlogController = async (req, res)=>{
    function calculateReadingTime(body) {
        const wordsPerMinute = 200;
        const words = body.trim().split(/\s+/).length;
        const timeInMinutes = Math.ceil(words / wordsPerMinute);
        return `${timeInMinutes} min read`;
}
    console.log("Reached blog controller");

    try{
        
        const { title, description, tags, body } = req.body;

        const user_id = req.user.id;
         if (!user_id) {
         throw new Error("user_id is required to create a blog.");
        }
        const response = await blogService.CreateBlog({
            title: title, 
            description:description,
            author: req.user.first_name,
            author_id: user_id,
            state: "draft",
            read_count:0,
            reading_time:calculateReadingTime(body),
            tags:tags,
            body:body
        })

        if (response){
            return res.status(201).json({
                status: 'success',
                message: 'Blog created successfully',
                data: response
            })
        }

    }catch(err){
         console.error(err); 
       return res.status(500).json({
            status: 'error',
            message: 'Failed to create blog',
            error: err.message
        })
    }
}

const getBlogsController = async (req,res)=>{
    try{
        const state = 'published';
        const filter ={state}

        const blogs = await Blog.find(filter);
          return res.status(200).json({
            status: 'success',
            message: 'Blogs fetched successfully',
            data: blogs
        });


    }catch(error){
    return res.status(500).json({
      status: 'error',
      message: 'Failed to get blogs',
      error: error.message
    });
    }
}
const getSingleBlogController = async (req, res) => {
  try {
   
    const state = 'published';

    const blog = await Blog.findOne({ _id: req.params.id, state });

    if (!blog) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Blog fetched successfully',
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to get blog',
      error: error.message,
    });
  }
};

// const updateBlogController = async(req,res)=>{

// }


module.exports ={
    createBlogController,
    getBlogsController,
    getSingleBlogController
}