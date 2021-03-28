import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState, useContext, useEffect } from 'react'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
	// Contexts
	const {
		postState: { post },
		updatePost,
		showUpdatePostModal,
		setShowUpdatePostModal,
		setShowToast
	} = useContext(PostContext)

	// State
	const [newPost, setNewPost] = useState(post)

	// Whenever single post chosen (in context) is changed, update newPost local state. If you don't do this, even when single post chosen (in context) is changed, the state of this component
	// stays the same because it is simply not bound to the context change
	useEffect(() => {
		setNewPost(post)
	}, [post])

	const closeDialog = () => {
		setNewPost(post)
		setShowUpdatePostModal(false)
	}

	const onChangeNewPostForm = event =>
		setNewPost({ ...newPost, [event.target.name]: event.target.value })

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updatePost(newPost)
		// setNewPost(post) // no need to because useEffect above already does that
		setShowUpdatePostModal(false)

		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdatePostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>What do you want to learn?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Title'
							name='title'
							value={newPost.title}
							onChange={onChangeNewPostForm}
							required
							aria-describedby='title-help'
						/>
						<Form.Text id='title-help' muted>
							Required
						</Form.Text>
					</Form.Group>

					<Form.Group>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Description'
							name='description'
							value={newPost.description}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Youtube Tutorial URL'
							name='url'
							value={newPost.url}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Control
							as='select'
							value={newPost.status}
							name='status'
							onChange={onChangeNewPostForm}
						>
							<option value='TO LEARN'>TO LEARN</option>
							<option value='LEARNING'>LEARNING</option>
							<option value='LEARNED'>LEARNED</option>
						</Form.Control>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						Learn!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default UpdatePostModal
