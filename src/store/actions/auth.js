import axios from 'axios'
import {AUTH_SUCCESS, AUTH_LOGOUT, TOGGLE_STATUS} from './actionTypes'

export function auth(email, password) {
    return async dispatch => {

        const authData = {
            email, password,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDE-mYhMw722dLY7ex6_MmZJeA5D810El0', authData)

            const data = response.data

            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

            localStorage.setItem('userId', data.localId)
            localStorage.setItem('token', data.idToken)
            localStorage.setItem('expirationDate', expirationDate)

            dispatch(authSuccess(data.idToken))
            dispatch(autoLogout(data.expiresIn))

        } catch (err) {
            console.log(err)
        }
    }
}

export function register(email, password) {
    return async (dispatch, getState) => {
        const state = getState().auth
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        const DefaultTask = {
            id: Math.random(),
            text: "Приветствую в Todolist-App",
            completed: false,
            edit: false
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDE-mYhMw722dLY7ex6_MmZJeA5D810El0', authData)

            await axios.post(`https://todolist-app-fb466.firebaseio.com/user/${response.data.localId}/task.json`, DefaultTask) 

            // const authStatus = {...this.state.authStatus}

            let registerStatus = state.registerSuccess

            registerStatus = !registerStatus
            dispatch(toogleStatus(registerStatus))
            setTimeout(() => {
                registerStatus = !registerStatus
                dispatch(toogleStatus(registerStatus))
            }, 3000)

            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }
}

/* --------------------------------------------------------------------------- */ 

export function  authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function  autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function toogleStatus(status) {
    return {
        type: TOGGLE_STATUS,
        status
    }
}

export function logout() {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

