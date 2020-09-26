import {FETCH_TODO_ERROR, 
        FETCH_TODO_START, 
        FETCH_TODO_SUCCESS,
        FETCH_TODO_UPDATE,
        FETCH_TODO_UP_SUCCESS,
        ADD_TASK_ON_DATABASE,
        DELETE_TASK_ON_DATABASE,
        TOGGLE_TASK_COMPLETED,
        ADD_FILTER,
        TOGGLE_EDIT_MODE,
        EDIT_TASK_UPDATE}
 from "../actions/actionTypes"

const initialState = {
    todolists: [],
    dataKey: [],
    filter: 'all',
    loader: false,
    loaderSm: false,
    error: null
}

export default function todoReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TODO_START:
            return {
                ...state, loader: true
            }
        case FETCH_TODO_SUCCESS:
            return {
                ...state, 
                loader: false,
                todolists: action.todolists,
                dataKey: action.dataKey
            }
        case FETCH_TODO_ERROR: {
            return {
                ...state, 
                loader: false,
                error: action.error
            }
        }
        case FETCH_TODO_UPDATE: {
            return {
                ...state,
                loaderSm: true
            }
        }
        case FETCH_TODO_UP_SUCCESS: {
            return {
                ...state, 
                todolists: action.todolists,
                dataKey: action.dataKey,
                loaderSm: action.loaderSm
            }
        }
        case ADD_TASK_ON_DATABASE: {
            return {
                ...state,
                todolists: action.newTasks,
                loaderSm: false
            }
        }
        case DELETE_TASK_ON_DATABASE: {
            return {
                ...state,
                todolists: action.newTasks,
                loaderSm: false
            }
        }
        case TOGGLE_TASK_COMPLETED: {
            return {
                ...state,
                todolists: action.newTasks,
                loaderSm: false
            }
        }
        case ADD_FILTER: {
            return {
                ...state,
                filter: action.filter
            }
        }
        case TOGGLE_EDIT_MODE: {
            return {
                ...state,
                todolists: action.newTasks,
                loaderSm: false
            }
        }
        case EDIT_TASK_UPDATE: {
            return {
                ...state,
                todolists: action.newTasks
            }
        }
        default:
            return state
    }
}