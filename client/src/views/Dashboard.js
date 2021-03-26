import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { apiUrl } from '../contexts/constants'
import addIcon from '../assets/plus-circle-fill.svg'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import SinglePost from '../components/SinglePost'

const Dashboard = () => {
	const {
		authInfo: {
			user: { username }
		}
	} = useContext(AuthContext)

	const [postsLoading, setPostsLoading] = useState(true)
	const [posts, setPosts] = useState([])

	useEffect(() => {
		const getAllPosts = async () => {
			try {
				const response = await axios.get(`${apiUrl}/posts`)
				if (response.data.success) {
					setPosts(response.data.posts)
					setPostsLoading(false)
				}
			} catch (error) {
				setPosts(null)
				setPostsLoading(false)
			}
		}
		getAllPosts()
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
					{posts.map(({ _id, ...postRest }) => (
						<Col key={_id} className='my-2'>
							<SinglePost post={postRest} />
						</Col>
					))}
				</Row>

				<OverlayTrigger
					placement='left'
					// show={true}
					overlay={<Tooltip>Add a new thing to learn</Tooltip>}
				>
					<Button className='btn-floating'>
						<img alt='edit' src={addIcon} width='60' height='60' />
					</Button>
				</OverlayTrigger>
			</>
		)
	}

	return body
}

export default Dashboard
