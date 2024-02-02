const commentModal = require("../models/commentModal")

const AddComment = async (req, res) => {

    try {

        const comment = new commentModal({
            userId: req.body.userId,
            postId: req.body.postId,
            comment: req.body.comment,
            createdAt: Date.now(),
            parentId: req.body.parentId
        })

        await comment.save().then(() => {
            res.send(comment)
        }).catch((error) => {
            res.send(error)
        })

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}