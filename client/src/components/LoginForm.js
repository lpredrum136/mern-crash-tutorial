import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import AlertMessage from './AlertMessage'
import { Fragment, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
	const history = useHistory()

	const { loginUser } = useContext(AuthContext)

	const [alert, setAlert] = useState(null)

	const [loginForm, setLoginForm] = useState({
		username: '',
		password: ''
	})

	const { username, password } = loginForm

	const onChangeLoginForm = event =>
		setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

	const login = async event => {
		event.preventDefault()
		const loginData = await loginUser(loginForm)

		if (!loginData.success) {
			setAlert({ type: 'danger', message: loginData.message })
			setTimeout(() => setAlert(null), 5000)
		} else {
			history.push('/dashboard')
		}
	}

	return (
		<Fragment>
			<Form className='my-4' onSubmit={login}>
				<AlertMessage info={alert} />

				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Username'
						name='username'
						value={username}
						onChange={onChangeLoginForm}
						required
					/>
				</Form.Group>

				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={onChangeLoginForm}
						required
					/>
				</Form.Group>

				<Button variant='success' type='submit'>
					Login
				</Button>
			</Form>
			<p>
				Don't have an account?
				<Link to='/register'>
					<Button variant='info' size='sm' className='ml-2'>
						Register
					</Button>
				</Link>
			</p>
		</Fragment>
	)
}

export default LoginForm
