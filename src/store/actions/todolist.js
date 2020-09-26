import axios from 'axios'
import {FETCH_TODO_START, 
        FETCH_TODO_SUCCESS,
        FETCH_TODO_UPDATE,
        FETCH_TODO_ERROR,
        FETCH_TODO_UP_SUCCESS,
        ADD_TASK_ON_DATABASE,
        DELETE_TASK_ON_DATABASE,
        TOGGLE_TASK_COMPLETED,
        ADD_FILTER,
        TOGGLE_EDIT_MODE,
        EDIT_TASK_UPDATE}
from './actionTypes'

export function fetchTodo() {
    return async dispatch => {
        dispatch(fetchTodoStart())
        try {
            const userId = localStorage.getItem('userId')
            const response = await axios.get(`https://todolist-app-fb466.firebaseio.com/user/${userId}/task.json`) 
            
            const getTodolist = Object.values(response.data)
            const dataKey = Object.keys(response.data)

            dispatch(fetchTodoSuccess(getTodolist, dataKey))  
            
    
        } catch(e) {
            dispatch(fetchTodoError(e))
        }
    }
}

export function TodoUpdate(prevProps) {
    return async (dispatch, getState) => {
        
        const state = getState()
        
        if (prevProps.todolists.length !== state.todolist.todolists.length) {
            // if (prevProps.todolists !== state.todolist.todolists 
            //     && state.todolist.todolists.length === 0) {
            //     dispatch(fetchTodoUpdate())
            // }
            try {
                const userId = localStorage.getItem('userId')
                const response = await axios.get(`https://todolist-app-fb466.firebaseio.com/user/${userId}/task.json`) 
                
                const getTodolist = Object.values(response.data)
                const dataKey = Object.keys(response.data)

                dispatch(fetchTodoUpSuccess(getTodolist, dataKey))

            } catch(e) {
                dispatch(fetchTodoError(e)) 
            }
        } 
    }
}

export function addTask(event) {
    return async (dispatch, getState) => {
        if (event.key === 'Enter') {

            if (event.target.value !== '' && event.target.value.length < 35) {
                const state = getState().todolist

                dispatch(fetchTodoUpdate())
    
                const tasks = state.todolists.concat() 
    
                const task = {
                    id: Math.random(),
                    text: event.target.value,
                    completed: false,
                    edit: false
                }
    
                tasks.push(task)
                event.target.value = ''
    
                const userId = localStorage.getItem('userId')
    
                try {
                    await axios.post(`https://todolist-app-fb466.firebaseio.com/user/${userId}/task.json`, task) 
                    dispatch(addTaskOnDatabase(tasks))
                } catch(e) {
                    dispatch(fetchTodoError(e))
                }
                
            }
                
        } 
    }
}

export function deleteTask(task) {
    return async (dispatch, getState) => {

        const state = getState().todolist

        dispatch(fetchTodoUpdate())
        try {
            const tasks = state.todolists.concat() 
            const userId = localStorage.getItem('userId')
            const index = state.todolists.indexOf(task)
            await axios.delete(`https://todolist-app-fb466.firebaseio.com/user/${userId}/task/${state.dataKey[index]}.json`) 

            const newTasks = tasks.filter((i) => i !== task)

            dispatch(deleteTaskOnDatabase(newTasks))

        } catch(e) {
            dispatch(fetchTodoError(e))
        }
    }
}

export function toggleCompleted(task) {
    return async (dispatch, getState) => {

        const state = getState().todolist

        dispatch(fetchTodoUpdate())

        try {
            const tasks = state.todolists.concat() 
            task.completed = !task.completed

            const userId = localStorage.getItem('userId')
            
            const index = state.todolists.indexOf(task)
            await axios.patch(`https://todolist-app-fb466.firebaseio.com/user/${userId}/task/${state.dataKey[index]}.json`, task) 

            dispatch(toggleTaskCompleted(tasks))

        } catch(e) {
            dispatch(fetchTodoError(e))
        }
    }
}

export function changedFilter(e) {
    return dispatch => {
        const filterName = e.target.getAttribute('data-value')
        dispatch(addFilter(filterName))
    }
}

export function clearAllCompleted() {
    return (dispatch, getState) => {
        const state = getState().todolist
        dispatch(fetchTodoUpdate())


        const tasks = state.todolists.concat() 
        let indexes = []

        tasks.forEach((t, i) => {
            if (t.completed === true) {
                indexes.push(i)
            }
        })

        indexes.forEach(async i => {
            try {
                const userId = localStorage.getItem('userId')
                await axios.delete(`https://todolist-app-fb466.firebaseio.com/user/${userId}/task/${state.dataKey[i]}.json`)
                
                const newTasks = tasks.filter(task => task.completed === false)

                dispatch(deleteTaskOnDatabase(newTasks))

            } catch(e) {
                dispatch(fetchTodoError(e))
            }
        })
    }
}

export function editTask(task, value) {
    return async (dispatch, getState) => {
        const state = getState().todolist

        dispatch(fetchTodoUpdate())


        const index = state.todolists.indexOf(task)
        const userId = localStorage.getItem('userId')
        if (value.length > 0) {
            const tasks = state.todolists.concat() 
            task.edit = !task.edit
            
            try {
                const index = state.todolists.indexOf(task)
                await axios.patch(`https://todolist-app-fb466.firebaseio.com/user/${userId}/task/${state.dataKey[index]}.json`, task) 

                dispatch(editTaskValue(tasks))
            } catch(e) {
                dispatch(fetchTodoError(e))
            }

        } else {
            try {
                await axios.delete(`https://todolist-app-fb466.firebaseio.com/user/${userId}/task/${state.dataKey[index]}.json`) 

                const newTasks = state.todolists.filter((t) => t !== task)
                dispatch(deleteTaskOnDatabase(newTasks))

            } catch(e) {
                dispatch(fetchTodoError(e))
            }
        }
    }
}

export function editTaskValue(task, value) {
    return (dispatch, getState) => {
        const state = getState().todolist
        const tasks = state.todolists.concat() 
        task.text = value

        dispatch(toggleEditMode(tasks))
    }
}

export function editModeOff(task, event) {
    return async (dispatch, getState) => {
        const state = getState().todolist
        dispatch(fetchTodoUpdate())
        // this.setState({
        //     loaderSm: true
        // })

        const index = state.todolists.indexOf(task)
        if (event.key === 'Enter') {
            const userId = localStorage.getItem('userId')
            if (event.target.value.length > 0) {
                const tasks = state.todolists.concat() 
                task.edit = !task.edit

                try {
                    const index = state.todolists.indexOf(task)
                    await axios.patch(`https://todolist-app-fb466.firebaseio.com/user/${userId}/task/${state.dataKey[index]}.json`, task) 
                    dispatch(editTaskValue(tasks))
                    // this.setState({
                    //     todolists:  tasks
                    // }) 
                } catch(e) {
                    dispatch(fetchTodoError(e))
                }

            } else {
                try {
                    await axios.delete(`https://todolist-app-fb466.firebaseio.com/user/${userId}/task/${state.dataKey[index]}.json`)
                    
                    
                    const newTasks = state.todolists.filter((t) => t !== task)
                    dispatch(deleteTaskOnDatabase(newTasks))
                    // this.setState({
                    //     todolists: state.todolists.filter((t) => t !== task) 
                    // })

                } catch(e) {
                    dispatch(fetchTodoError(e))
                }

            }
        }
    }
}

/* ---------------------------------------------------------------------- */ 

export function fetchTodoStart() {
    return {
        type: FETCH_TODO_START
    }
}

export function fetchTodoSuccess(todolists, dataKey) {
    return {
        type: FETCH_TODO_SUCCESS,
        todolists,
        dataKey
    }
}

export function fetchTodoUpSuccess(todolists, dataKey) {
    return {
        type: FETCH_TODO_UP_SUCCESS,
        todolists,
        dataKey,
        loaderSm: false
    }
}

export function fetchTodoUpdate() {
    return {
        type: FETCH_TODO_UPDATE
    }
}

export function fetchTodoError(e) {
    return {
        type: FETCH_TODO_ERROR,
        error: e
    }
}

export function addTaskOnDatabase(tasks) {
    return {
        type: ADD_TASK_ON_DATABASE,
        newTasks: tasks
    }
}

export function deleteTaskOnDatabase(tasks) {
    return {
        type: DELETE_TASK_ON_DATABASE,
        newTasks: tasks
    }
}

export function toggleTaskCompleted(tasks) {
    return {
        type: TOGGLE_TASK_COMPLETED,
        newTasks: tasks
    }
}

export function addFilter(category) {
    return {
        type: ADD_FILTER,
        filter: category
    }

}

export function editTaskUpdate(tasks) {
    return {
        type: EDIT_TASK_UPDATE,
        newTasks: tasks
    }
}

export function toggleEditMode(tasks) {
    return {
        type: TOGGLE_EDIT_MODE,
        newTasks: tasks
    }

}

