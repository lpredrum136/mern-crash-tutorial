export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000/api'
		: 'https://damp-sea-26656.herokuapp.com/api'

export const localStorageTokenName = 'learnit-accessToken'
