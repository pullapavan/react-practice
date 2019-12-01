import { AUTH_DATA } from '../constants/index'
export function saveStateToLocalStorae(state) {
    let auth = null
    if (!state || Object.keys(state.auth).length === 0) {
        auth = authDataFromStorage()
    } else {
        auth = state.auth
    }
    window.localStorage.setItem(AUTH_DATA, JSON.stringify(auth))
}

export function authDataFromStorage() {
    let auth = window.localStorage.getItem(AUTH_DATA)
    if (!auth || Object.keys(auth).length === 0) {
        let initialState = {
            name: "administrator",
            roles: ['HOME', 'b', 'c'],
            privileges: ['home_tab', 'p2', 'p3']
        }
        return initialState
    }
    return JSON.parse(auth)
}