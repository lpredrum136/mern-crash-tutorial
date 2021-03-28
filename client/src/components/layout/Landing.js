import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import { Redirect } from 'react-router-dom'

const Landing = () => {
	const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	if (authLoading)
		return (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)

	return isAuthenticated ? (
		<Redirect to='/dashboard' />
	) : (
		<Redirect to='/login' />
	)
}

export default Landing
