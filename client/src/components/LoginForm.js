import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

const LoginForm = () => {
	const [loginForm, setLoginForm] = useState({
		username: '',
		password: ''
	})

	const { username, password } = loginForm

	const onChangeLoginForm = event =>
		setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

	const login = event => {
		event.preventDefault()
		console.log(loginForm)
	}

	return (
		<Fragment>
			<Form className='my-4' onSubmit={login}>
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
