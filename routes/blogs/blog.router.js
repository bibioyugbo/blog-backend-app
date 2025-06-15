const express = require ('express');
const router = express.Router()
const {authenticateUser} = require('../../middleware/auth.middleware');
const {createBlogController, getBlogsController, getSingleBlogController, updateBlogController, deleteBlogController} = require('../../controllers/blogs/blog.controller')

router.post('/', authenticateUser, createBlogController)
router.get('/', getBlogsController)
router.get('/:id', getSingleBlogController)
router.put('/:id',authenticateUser, updateBlogController)
router.delete('/:id',authenticateUser, deleteBlogController)




module.exports = router;
