const postModal = require("../models/postModal")

const createPost = async (req , response) =>{


    try
    {

        const newPost = new postModal({
            userId : req.body.id ,
            content : req.body.content ,
            createdAt : Date.now(),
            updatedAt : Date.now()
        })

        await newPost.save().then(() => {
            response.send(newPost);
            console.log('Post saved successfully!');
        })
            .catch((error) => {
                response.send(error)
                console.error('Error saving post:', error);
            });
    }catch(error)
    {
        console.log(error)
        response.send(error)
    }
}

const getPost = async (req , res) =>{

    const post = await postModal.find({})
    res.send(post)

}
module.exports = {createPost , getPost}