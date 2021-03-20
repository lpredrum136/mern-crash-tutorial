export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000/api'
		: 'something'

export const localStorageTokenName = 'learnit-accessToken'
