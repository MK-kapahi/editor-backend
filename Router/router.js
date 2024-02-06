const express = require('express')

const router = express.Router();
const {login, register} = require("../controller/authController");
const { createPost, getPost } = require('../controller/postController');
const { AddComment, getComment } = require('../controller/commentController');

//auth router 
router.route('/login').post(login);
router.route("/signup").post(register)

//post router 
router.route("/createPost").post(createPost)
router.route("/getPost").get(getPost)


//comment router 
router.route("/addComment").post(AddComment),
router.route("/getComment/:id").get(getComment)
module.exports = router