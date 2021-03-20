const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', async (req, res) => {
	const { title, description, url } = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		const newPost = new Post({
			title,
			description: description || '',
			url: url || ''
		})

		await newPost.save()
		console.log(newPost)
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router
