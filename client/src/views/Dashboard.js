import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { PostContext } from '../contexts/PostContext'
import addIcon from '../assets/plus-circle-fill.svg'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import UpdatePostModal from '../components/posts/UpdatePostModal'
import Toast from 'react-bootstrap/Toast'

const Dashboard = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		postState: { posts, postsLoading, post },
		getPosts,
		setShowAddPostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(PostContext)

	// Start: Get all posts
	useEffect(() => {
		getPosts()
	}, [])

	let body = null

	if (postsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (posts === null) {
		// Server error
		body = <Alert variant='danger'>Internal server error</Alert>
	} else if (posts.length === 0) {
		body = (
			<Card className='text-center mx-5 my-5'>
				<Card.Header as='h1'>Hi {username}</Card.Header>
				<Card.Body>
					<Card.Title>Welcome to LearnIt</Card.Title>
					<Card.Text>
						Click the button below to create your first skill to learn
					</Card.Text>
					<Button variant='primary'>LearnIt!</Button>
				</Card.Body>
			</Card>
		)
	} else {
		body = (
			<>
				<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
					{posts.map(post => (
						<Col key={post._id} className='my-2'>
							<SinglePost post={post} />
						</Col>
					))}
				</Row>

				{/* Add Post functionality */}
				<OverlayTrigger
					placement='left'
					// show={true}
					overlay={<Tooltip>Add a new thing to learn</Tooltip>}
				>
					<Button
						className='btn-floating'
						onClick={setShowAddPostModal.bind(this, true)}
					>
						<img alt='edit' src={addIcon} width='60' height='60' />
					</Button>
				</OverlayTrigger>

				<AddPostModal />

				{/* After post added, show toast */}
				<Toast
					show={show}
					style={{ position: 'fixed', top: '10%', right: '10px' }}
					onClose={setShowToast.bind(this, {
						show: false,
						message: '',
						type: null
					})}
					className={`bg-${type} text-white`}
					delay={3000}
					autohide
				>
					<Toast.Body>
						<strong>{message}</strong>
					</Toast.Body>
				</Toast>

				{/* Update post functionality  */}
				{post !== null && <UpdatePostModal />}
			</>
		)
	}

	return body
}

export default Dashboard
