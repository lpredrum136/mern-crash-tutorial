import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { useContext } from 'react'
import { PostContext } from '../../contexts/PostContext'

const ActionButtons = ({ url, _id }) => {
	const { deletePost, setShowUpdatePostModal, findPost } = useContext(
		PostContext
	)

	const choosePost = postId => {
		findPost(postId)
		setShowUpdatePostModal(true)
	}

	return (
		<>
			<Button className='post-button' href={url} target='_blank'>
				<img alt='play' src={playIcon} width='32' height='32' />
			</Button>
			<Button className='post-button' onClick={choosePost.bind(this, _id)}>
				<img alt='edit' src={editIcon} width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deletePost.bind(this, _id)}>
				<img alt='delete' src={deleteIcon} width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons
