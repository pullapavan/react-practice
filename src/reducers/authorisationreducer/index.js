import { authDataFromStorage, saveStateToLocalStorae } from '../../store/persistandrestorestate'
import { LOGOUT, LOGIN } from './constants'

const loginreducer = (state = authDataFromStorage() || {}, action) => {

    switch (action.type) {
        case LOGOUT: window.localStorage.removeItem('AUTH_DATA'); return {}
        case LOGIN: saveStateToLocalStorae(action.data || {}); return { ...action.data }
        default: return authDataFromStorage()
    }
}
export default loginreducer;