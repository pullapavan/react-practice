import { authDataFromStorage } from '../../store/persistandrestorestate'
import { REFRESH } from './constants'

const reducer = (state = authDataFromStorage(), action) => {
    console.log("Initialising reducer with ")
    console.log(state)
    switch (action.type) {
        case REFRESH: window.localStorage.removeItem('AUTH_DATA');return {}
        default: return authDataFromStorage()
    }
}
export default reducer;