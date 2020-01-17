import { authDataFromStorage, saveStateToLocalStorae } from '../../store/persistandrestorestate'
import { LOGOUT, LOGIN, SET_TEAMS } from './constants'

const loginreducer = (state = authDataFromStorage() || {}, action) => {

    switch (action.type) {
        case LOGOUT: window.localStorage.removeItem('AUTH_DATA'); return {}
        case LOGIN: return { ...action.data }
        case SET_TEAMS:
            let teams = state.teams || [];
            if (action.data) {
                teams.push(action.date)                
                return ({ ...state, teams })
            }
            return state;
        default: return authDataFromStorage()
    }
}
export default loginreducer;