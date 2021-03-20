import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
	return (
		<Fragment>
			<Form className='my-4'>
				<Form.Group>
					<Form.Control type='text' placeholder='Username' />
				</Form.Group>

				<Form.Group>
					<Form.Control type='password' placeholder='Password' />
				</Form.Group>

				<Form.Group>
					<Form.Control type='password' placeholder='Confirm Password' />
				</Form.Group>

				<Button variant='success'>Register</Button>
			</Form>
			<p>
				Already have an account?
				<Link to='/login'>
					<Button variant='info' size='sm' className='ml-2'>
						Login
					</Button>
				</Link>
			</p>
		</Fragment>
	)
}

export default RegisterForm
