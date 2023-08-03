import express from "express";
import auth from "../../middleware/auth.js";
import {check, validationResult} from "express-validator";
import User from "../../models/User.js";
import Posts from "../../models/Posts.js";

const router = express.Router();

router.post(
    '/',
    [
        auth,
        [
            check('text', 'Text id required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) =>
    {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const user = await User.findById(req.user.id).select('-password')

            const newPost = new Posts({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })

            const post = await newPost.save()

            return res.json(post)
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({ msg: err.message })
        }
    }
)

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Posts.find().sort({ date: -1 })
        return res.json(posts)
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ msg: err.message })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)

        !post && res.status(404).json({ msg: "Post not found" })

        return res.json(post)
    } catch (err) {
        console.log(err.message)
        err.kind === 'ObjectId'  && res.status(404).json({ msg: "Post not found" })
        return res.status(500).json({ msg: err.message })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)

        !post && res.status(404).json({ msg: "Post not found" })

        post.user.toString() !== req.user.id && res.status(401).json({ msg: 'User not authorized' })

        await post.remove()

        return res.json({ msg: 'Post deleted' })
    } catch (err) {
        console.log(err.message)
        err.kind === 'ObjectId'  && res.status(404).json({ msg: "Post not found" })
        return res.status(500).json({ msg: err.message })
    }
})

router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)

        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: "Post already liked" })
        }

        post.likes.unshift({ user: req.user.id })

        await post.save()

        return res.json(post.likes)

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)

        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: "Post has not been liked" })
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

        post.likes.splice(removeIndex, 1)

        await post.save()

        return res.json(post.likes)

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

router.post(
    '/comment/:id',
    [
        auth,
        [
            check('text', 'Text id required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) =>
    {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const user = await User.findById(req.user.id).select('-password')
            const post = await Posts.findById(req.params.id)

            const newComment = new Posts({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })

            post.comments.unshift(newComment)

            await post.save()

            return res.json(post.comments)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
)

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        const comment = post.comments.find(
            comment => comment.id === req.params.comment_id
        )

        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" })
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized'})
        }

        const removeIndex = post.comments
            .map(comment => comment.user.toString())
            .indexOf(req.user.id)

        post.comments.splice(removeIndex, 1)

        await post.save()

        return res.json(post.comments)

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

export default router