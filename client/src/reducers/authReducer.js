export const authReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case 'USER_LOADED':
			return {
				...state,
				authLoading: false,
				isAuthenticated: payload
			}

		default:
			return state
	}
}
