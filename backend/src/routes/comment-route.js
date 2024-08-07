const express = require('express')
const router = express.Router()
const Comment = require('../models/comment-model')
const verifyToken = require('../middleware/verifyToken')
const isAdmin = require('../middleware/admin')

// CREATE A POST
router.post('/post-comment', verifyToken, isAdmin, async (req, res) => {
    try {
        const new_comment = await Comment(req.body)
        await new_comment.save()
        res.status(200).send({ message: "Comment created successfully", comment: new_comment })
    } catch (error) {
        console.log("Error creating comment: ", error)
        res.status(500).send({ message: "Error creating comment"})
    }
})

// GET ALL COMMENTS
router.get('/total-comments', async(req, res) => {
    try {
        const total_comments = await Comment.countDocuments({})
        res.status(200).send({message: "Total comments retrieved successfully", total_comments})
    } catch (error) {
        console.log("Error getting all comments: ", error)
        res.status(500).send({ message: "Error getting all comments: "})
    }
})

// DELETE A SPECIFIC COMMENT
router.delete('/:id', verifyToken, isAdmin, async(req, res) => {
    try {
        const comment_id = req.params.id
        const delete_comment = await Comment.findByIdAndDelete(comment_id)
        
        if (!delete_comment) { return res.status(404).send({ message: "Comment not found" }) }

        res.status(200).send({ message: "Comment deleted successfully", deletedComment: delete_comment })
    } catch (error) {
        console.log("Error deleting specific comment", error)
        res.status(500).send({message: "Error deleting specific comment"})
    }
})




module.exports = router