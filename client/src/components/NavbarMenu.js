import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../assets/logo.svg'
import logoutIcon from '../assets/logout.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import Button from 'react-bootstrap/Button'

const NavbarMenu = () => {
	const {
		authInfo: {
			user: { username }
		},
		logoutUser
	} = useContext(AuthContext)

	const logout = () => {
		logoutUser()
	}

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

				<Nav>
					<Nav.Link className='font-weight-bolder text-white' disabled>
						Welcome {username}
					</Nav.Link>
					<Button className='font-weight-bolder text-white' onClick={logout}>
						<img
							alt='logout'
							src={logoutIcon}
							width='32'
							height='32'
							className='mr-2'
						/>{' '}
						Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavbarMenu
