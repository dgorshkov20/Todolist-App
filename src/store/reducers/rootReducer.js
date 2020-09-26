import {combineReducers} from 'redux'
import todoReducer from './todolist'
import authReducer from './auth'

export default combineReducers({
    todolist: todoReducer,
    auth: authReducer
})