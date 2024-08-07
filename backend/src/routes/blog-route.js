const express = require('express')
const router = express.Router()
const Blog = require('../models/blog-model')
const Comment = require('../models/comment-model')
const verifyToken = require('../middleware/verifyToken')
const isAdmin = require('../middleware/admin')

// GET ALL POSTS WITH OPTIONAL SEARCH
router.get('/', async (req, res) => {
    try {
        const { search = '' } = req.query;
        const query = search ? {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { "content.blocks.data.text": { $regex: search, $options: "i" } }
            ]
        } : {};

        const allPosts = await Blog.find(query).sort({ createdAt: -1 }).populate('author', 'username role');
        res.status(200).json(allPosts);
    } catch (error) {
        console.error("Error getting all posts: ", error);
        res.status(500).json({ message: "Error getting all posts", error });
    }
});

// GET A SINGLE POST BY ID
router.get("/:id", async (req, res) => {
    try {
        const post_id = req.params.id;
        const post = await Blog.findById(post_id).populate('author', 'username role');
        if (!post) {
            return res.status(404).send({ message: "Post could not be found" });
        }
        const comments = await Comment.find({ postId: post_id }).populate("user", "username email role");
        res.status(200).send({ post, comments });
    } catch (error) {
        console.log("Error getting a post: ", error);
        res.status(500).send({ message: "Error getting a post", error });
    }
});


// CREATE A POST
router.post("/create-post", verifyToken, isAdmin, async (req, res) => {
    try {
        const new_post = new Blog({ ...req.body, author: req.userId })
        await new_post.save()
        res.status(200).send({ message: "Post created sucscessfully", post: new_post })
    } catch (error) {
        console.log("Error creating post: ", error)
        res.status(500).send({ message: "Error creating post" })
    }
})

// UPDATE A POST BY ID
router.patch("/update-post/:id", verifyToken, isAdmin, async (req, res) => {
    try {
        const post_id = req.params.id
        const update_post = await Blog.findByIdAndUpdate(post_id, { ...req.body }, { new: true })
        console.log(update_post)
        if (!update_post) { res.status(404).send({ message: "Post could not be found" }) } // ADDITIONAL CHECK SINCE CATCH FAILS TO ACCOUNT FOR MISSING POST
        res.status(200).send({ message: "Post updated successfully", post: update_post })
    } catch (error) {
        console.log("Error updating post: ", error)
        res.status(500).send({ message: "Error updating post" })
    }
})

// DELETE A POST
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
    try {
        const post_id = req.params.id
        const delete_post = await Blog.findByIdAndDelete(post_id)
        if (!delete_post) { res.status(404).send({ message: "Post could not be found" }) } // ADDITIONAL CHECK SINCE CATCH FAILS TO ACCOUNT FOR MISSING POST
        await Comment.deleteMany({ postId: post_id }) // DELETE COMMENTS ALONGSIDE THE POST
        res.status(200).send({ message: "Post deleted successfully", post: delete_post })
    } catch (error) {
        console.log("Error deleting post: ", error)
        res.status(500).send({ message: "Error deleting post" })
    }
})

// RELATED POSTS
router.get("/related-posts/:id", async (req, res) => {
    try {
        const { id } = req.params
        if (!id) { return res.status(404).send({ message: "Post ID required" }) } // ADDITIONAL CHECK SINCE CATCH FAILS TO ACCOUNT FOR MISSING ID

        const post = await Blog.findById(id)
        if (!post) { return res.status(404).send({ message: "Post cannot be found" }) } // ADDITIONAL CHECK SINCE CATCH FAILS TO ACCOUNT FOR MISSING POST

        const title_regex = new RegExp(post.title.split(' ').join('|'), 'i')
        const related_query = {
            _id: { $ne: id },
            title: { $regex: title_regex },
            category: post.category
        }

        const related_post = await Blog.find(related_query)
        res.status(200).send(related_post)
    } catch (error) {
        console.log("Error getting related posts: ", error)
        res.status(500).send({ message: "Error getting related post" })
    }
})

module.exports = router