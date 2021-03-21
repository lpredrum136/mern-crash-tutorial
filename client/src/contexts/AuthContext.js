import { createContext, useReducer, useEffect } from 'react'
import { authReducer } from '../reducers/authReducer'
import { apiUrl, localStorageTokenName } from './constants'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
	const [authInfo, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthenticated: false
	})

	useEffect(() => {
		const loadUser = async () => {
			console.log('Checking user...')
			if (localStorage[localStorageTokenName])
				setAuthToken(localStorage[localStorageTokenName])

			try {
				const response = await axios.get(`${apiUrl}/auth`)
				if (response.data.success)
					dispatch({ type: 'USER_LOADED', payload: true })
			} catch (error) {
				dispatch({ type: 'USER_LOADED', payload: false })
			}
		}

		loadUser()
	}, [])

	const loginUser = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}/auth/login`, userForm)
			if (response.data.success)
				localStorage.setItem(localStorageTokenName, response.data.accessToken)

			dispatch({ type: 'USER_LOADED', payload: true })
			return response.data
		} catch (error) {
			// when status back from API is different from OK
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

	const registerUser = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}/auth/register`, userForm)
			if (response.data.success)
				localStorage.setItem(localStorageTokenName, response.data.accessToken)

			dispatch({ type: 'USER_LOADED', payload: true })
			return response.data
		} catch (error) {
			// when status back from API is different from OK
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

	const authContextData = {
		authInfo,
		loginUser,
		registerUser,
		dispatch
	}

	console.log(authInfo)

	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
