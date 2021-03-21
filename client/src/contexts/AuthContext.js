import { createContext, useReducer } from 'react'
import { authReducer } from '../reducers/authReducer'
import { apiUrl, localStorageTokenName } from './constants'
import axios from 'axios'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
	const [isAuthenticated, dispatch] = useReducer(authReducer, false)

	const loginUser = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}/auth/login`, userForm)
			if (response.data.success)
				localStorage.setItem(localStorageTokenName, response.data.accessToken)

			dispatch({ type: 'TOGGLE_AUTH' })
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

			dispatch({ type: 'TOGGLE_AUTH' })
			return response.data
		} catch (error) {
			// when status back from API is different from OK
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

	const authContextData = { isAuthenticated, loginUser, registerUser, dispatch }

	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
