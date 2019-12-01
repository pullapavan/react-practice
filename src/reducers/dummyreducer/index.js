let initialState = {
    dummyname: "administrator",
    dummyroles: ['a', 'b', 'c'],
    dummypriviliges: ['p1', 'p2', 'p3']
}//get this data from server on app initialisation

const dummyreducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT': return initialState
        case 'DECREMENT': return initialState
        case 'RESET': return initialState
        default: return initialState
    }
}
export default dummyreducer;