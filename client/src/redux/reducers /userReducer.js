const initialState = {
    users : [],
    loggedInUser : null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER":
            return {
                ...state,
                users : [...state.users, action.payload]
            }
        case "LOGIN":
            return {
                ...state,
                loggedInUser : action.payload
            }
        
        case "LOGOUT":
            return {
                ...state,
                loggedInUser : null
            }
            
        default:
        return state;
    }
}

export default userReducer;