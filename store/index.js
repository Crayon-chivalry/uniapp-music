import { createStore } from 'vuex'

export default createStore({
	state: {
		loginState: false
	},
	mutations: {
		setLoginState(state, payload) {
			state.loginState = payload
		}
	}
})