import { createContext, useReducer, useState } from 'react'
import { postReducer } from '../reducers/postReducer'
import { apiUrl } from './constants'
import axios from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
	// State
	const [postState, dispatch] = useReducer(postReducer, {
		posts: [],
		postsLoading: true
	})

	const [showAddPostModal, setShowAddPostModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all posts
	const getPosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/posts`)
			if (response.data.success) {
				dispatch({ type: 'POSTS_LOADED_SUCCESS', payload: response.data.posts })
			}
		} catch (error) {
			dispatch({ type: 'POSTS_LOADED_FAIL' })
		}
	}

	// Add post
	const addPost = async newPost => {
		try {
			const response = await axios.post(`${apiUrl}/posts`, newPost)
			if (response.data.success) {
				dispatch({ type: 'ADD_POST', payload: response.data.post })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete post
	const deletePost = async postId => {
		try {
			const response = await axios.delete(`${apiUrl}/posts/${postId}`)
			if (response.data.success) {
				dispatch({ type: 'DELETE_POST', payload: postId })
			}
		} catch (error) {
			console.log(error)
		}
	}

	// Context data
	const postContextData = {
		postState,
		getPosts,
		addPost,
		showAddPostModal,
		setShowAddPostModal,
		showToast,
		setShowToast,
		deletePost,
		dispatch
	}

	return (
		<PostContext.Provider value={postContextData}>
			{children}
		</PostContext.Provider>
	)
}

export default PostContextProvider
