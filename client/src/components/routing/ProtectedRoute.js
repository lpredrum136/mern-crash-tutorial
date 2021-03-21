import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const {
		authInfo: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	if (authLoading) return <Spinner animation='border' variant='info' />

	return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated ? (
					<Component {...rest} {...props} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	)
}

export default ProtectedRoute
