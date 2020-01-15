import { AUTH_DATA } from '../constants/index'
export function saveStateToLocalStorae(state) {
    window.localStorage.setItem(AUTH_DATA, JSON.stringify(state.login || authDataFromStorage() || {}))
}

export function authDataFromStorage() {
    let auth = window.localStorage.getItem(AUTH_DATA)
    return JSON.parse(auth || '{}')
}
