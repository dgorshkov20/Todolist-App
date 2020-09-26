import {AUTH_SUCCESS, AUTH_LOGOUT, TOGGLE_STATUS} from '../actions/actionTypes'

const initialState = {
    token: null,
    registerSuccess: false
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS: {
            return {
                ...state,
                token: action.token
            }
        }
        case AUTH_LOGOUT: {
            return {
                ...state,
                token: null
            }
        }
        case TOGGLE_STATUS: {
            return {
                ...state,
                registerSuccess: action.status
            }
        }
        default:
            return state
    }
}