import Button from 'react-bootstrap/Button'
import playIcon from '../assets/play-btn.svg'
import editIcon from '../assets/pencil.svg'
import deleteIcon from '../assets/trash.svg'

const ActionButtons = ({ url }) => {
	return (
		<>
			<Button className='post-button' href={url} target='_blank'>
				<img alt='play' src={playIcon} width='32' height='32' />
			</Button>
			<Button className='post-button'>
				<img alt='edit' src={editIcon} width='24' height='24' />
			</Button>
			<Button className='post-button'>
				<img alt='delete' src={deleteIcon} width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons
