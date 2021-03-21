import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Auth from './views/Auth'
import Dashboard from './views/Dashboard'
import AuthContextProvider from './contexts/AuthContext'
import ProtectedRoute from './components/routing/ProtectedRoute'

function App() {
	return (
		<AuthContextProvider>
			<Router>
				<Switch>
					<ProtectedRoute exact path='/dashboard' component={Dashboard} />
					<Route
						exact
						path='/login'
						render={props => <Auth {...props} authRoute='login' />}
					/>
					<Route
						exact
						path='/register'
						render={props => <Auth {...props} authRoute='register' />}
					/>
				</Switch>
			</Router>
		</AuthContextProvider>
	)
}

export default App
