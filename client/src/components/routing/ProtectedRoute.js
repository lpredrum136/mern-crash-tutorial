import { Route, Redirect } from 'react-router-dom'
import { useContext, Fragment } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import NavbarMenu from '../NavbarMenu'

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const {
		authInfo: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	if (authLoading)
		return (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)

	return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated ? (
					<Fragment>
						<NavbarMenu />
						<Component {...rest} {...props} />
					</Fragment>
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	)
}

export default ProtectedRoute
