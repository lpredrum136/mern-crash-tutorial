import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const Auth = ({ authRoute }) => {
	const {
		authInfo: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	let body

	if (authLoading) body = <Spinner animation='border' variant='info' />
	else if (isAuthenticated) return <Redirect to='/dashboard' />
	else
		body = (
			<Fragment>
				{authRoute === 'login' && <LoginForm />}
				{authRoute === 'register' && <RegisterForm />}
			</Fragment>
		)
	return (
		<div className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1>LearnIt</h1>
					<h4>Keep track of what you are learning</h4>
					{body}
				</div>
			</div>
		</div>
	)
}

export default Auth
