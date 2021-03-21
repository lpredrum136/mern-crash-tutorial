import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../assets/code-slash.svg'
import { Link } from 'react-router-dom'

const NavbarMenu = () => {
	return (
		<Navbar expand='lg' bg='primary' variant='dark'>
			<Navbar.Brand className='font-weight-bolder text-white'>
				<img
					alt='learnit-logo'
					src={learnItLogo}
					width='32'
					height='32'
					className='mr-2'
				/>
				LearnIt
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link
						as={Link}
						className='font-weight-bolder text-white'
						to='/dashboard'
					>
						Dashboard
					</Nav.Link>
					<Nav.Link
						as={Link}
						className='font-weight-bolder text-white'
						to='/about'
					>
						About
					</Nav.Link>
				</Nav>

				<Button variant='outline-success'>Search</Button>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavbarMenu
