export function increment() {
    return {
        type: 'INCREMENT'
    }
}
export function decrement() {
    return {
        type: 'DECREMENT'
    }
}
export function refresh() {
    return { type: 'REFRESH' }
}

export function login(data) {
    return {
        type: 'LOGIN', data
    }
}

export function logout() {
    return {
        type: 'LOGOUT'
    }
}

export function setTeams(data) {
    return {
        type: 'SET_TEAMS', data
    }
}