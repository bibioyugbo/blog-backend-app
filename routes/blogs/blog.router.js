const express = require ('express');
const router = express.Router()
const {authenticateUser} = require('../../middleware/auth.middleware');
const {createBlogController, getBlogsController, getSingleBlogController} = require('../../controllers/blogs/blog.controller')

router.post('/', authenticateUser, createBlogController)
router.get('/', getBlogsController)
router.get('/:id', getSingleBlogController)


module.exports = router;
