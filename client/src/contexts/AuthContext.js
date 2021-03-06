import { createContext, useReducer, useEffect } from 'react'
import { authReducer } from '../reducers/authReducer'
import { apiUrl, localStorageTokenName } from './constants'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthenticated: false,
		user: null
	})

	// Authenticate user
	const loadUser = async () => {
		console.log('Checking user...')
		if (localStorage[localStorageTokenName])
			setAuthToken(localStorage[localStorageTokenName])

		try {
			const response = await axios.get(`${apiUrl}/auth`)
			if (response.data.success)
				dispatch({
					type: 'SET_AUTH',
					payload: { isAuthenticated: true, user: response.data.user }
				})
		} catch (error) {
			localStorage.removeItem(localStorageTokenName)
			setAuthToken(null)
			dispatch({
				type: 'SET_AUTH',
				payload: { isAuthenticated: false, user: null }
			})
		}
	}

	useEffect(() => {
		loadUser()
	}, [])

	// Login
	const loginUser = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}/auth/login`, userForm)
			if (response.data.success)
				localStorage.setItem(localStorageTokenName, response.data.accessToken)

			await loadUser()
			return response.data
		} catch (error) {
			// when status back from API is different from OK
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

	// Register
	const registerUser = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}/auth/register`, userForm)
			if (response.data.success)
				localStorage.setItem(localStorageTokenName, response.data.accessToken)

			loadUser()
			return response.data
		} catch (error) {
			// when status back from API is different from OK
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

	// Logout
	const logoutUser = () => {
		localStorage.removeItem(localStorageTokenName)
		dispatch({ type: 'SET_AUTH', payload: false })
	}

	const authContextData = {
		authState,
		loginUser,
		registerUser,
		logoutUser,
		dispatch
	}

	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
