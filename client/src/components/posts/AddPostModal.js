import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useState } from 'react'

const AddPostModal = ({ show, close, addPost }) => {
	const [newPost, setNewPost] = useState({
		title: '',
		description: '',
		url: '',
		status: 'TO LEARN'
	})

	const { title, description, url } = newPost

	const closeDialog = () => {
		setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' })
		close()
	}

	const onChangeNewPostForm = event =>
		setNewPost({ ...newPost, [event.target.name]: event.target.value })

	const onSubmit = event => {
		event.preventDefault()
		addPost({ ...newPost, url: `https://${url}` })
	}

	return (
		<Modal show={show} onHide={closeDialog}>
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
							value={title}
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
							value={description}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>

					<Form.Group>
						<InputGroup className='mb-2 mr-sm-2'>
							<InputGroup.Prepend>
								<InputGroup.Text>https://</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								type='text'
								placeholder='Youtube Tutorial URL'
								name='url'
								value={url}
								onChange={onChangeNewPostForm}
							/>
						</InputGroup>
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

export default AddPostModal
