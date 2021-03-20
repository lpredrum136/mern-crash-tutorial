import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const LoginForm = () => {
	return (
		<Fragment>
			<Form className='my-4'>
				<Form.Group>
					<Form.Control type='text' placeholder='Username' />
				</Form.Group>

				<Form.Group>
					<Form.Control type='password' placeholder='Password' />
				</Form.Group>

				<Button variant='success'>Login</Button>
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
