const express = require('express')

const router = express.Router();
const {login, register} = require("../controller/authController");
const { createPost, getPost } = require('../controller/postController');

//auth router 
router.route('/login').post(login);
router.route("/signup").post(register)

//post router 
router.route("/createPost").post(createPost)
router.route("/getPost",getPost)
module.exports = router