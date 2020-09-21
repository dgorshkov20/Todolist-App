import React from 'react'
import classes from './Todolist.module.scss'
import axios from 'axios'
import Input from '../../components/UI/Input/Input'
import TaskLists from '../../components/TaskLists/TaskLists'
import TodoStatus from '../../components/TodoStatus/TodoStatus'
import Loader from '../../components/UI/Loader/Loader'


class Todolist extends React.Component {

    state = {
        todolists: [],
        dataKey: [],
        filter: 'all',
        loader: true,
        loaderSm: false
    }

    onAddHandler = async event => {
        if (event.key === 'Enter') {
            if (event.target.value !== '' && event.target.value.length < 35) {

                this.setState({
                    loaderSm: true
                })

                const tasks = this.state.todolists.concat() 
    
                const task = {
                    id: Math.random(),
                    text: event.target.value,
                    completed: false,
                    edit: false
                }
    
                tasks.push(task)
                event.target.value = ''

                try {
                    await axios.post('https://todolist-app-fb466.firebaseio.com/task.json', task) 
                } catch(e) {
                    console.error(e)
                }
                
                this.setState({
                    todolists: tasks
                })
            }
            
        } 
    } 

    onDeleteHandler = async task => {

        this.setState({
            loaderSm: true
        })

        try {
            const index = this.state.todolists.indexOf(task)
            await axios.delete(`https://todolist-app-fb466.firebaseio.com/task/${this.state.dataKey[index]}.json`) 

            this.setState({
                todolists: this.state.todolists.filter((i) => i !== task) 
            })

        } catch(e) {
            console.error(e)
        }
    }

    onToggleComplete = async task => {

        this.setState({
            loaderSm: true
        })

        try {
            const tasks = this.state.todolists.concat() 
            task.completed = !task.completed
            
            const index = this.state.todolists.indexOf(task)
            await axios.patch(`https://todolist-app-fb466.firebaseio.com/task/${this.state.dataKey[index]}.json`, task) 
            this.setState({
                todolists: tasks
            })

        } catch(e) {
            console.error(e)
        }
        console.log(this.state.loaderSm)
    }

    clearCompletedHandler = () => {

        this.setState({
            loaderSm: true
        })

        const tasks = this.state.todolists.concat() 
        let indexes = []

        tasks.forEach((t, i) => {
            if (t.completed === true) {
                indexes.push(i)
            }
        })

        indexes.forEach(async i => {
            try {
                await axios.delete(`https://todolist-app-fb466.firebaseio.com/task/${this.state.dataKey[i]}.json`) 

                this.setState({
                    todolists: tasks.filter(task => task.completed === false)
                })

            } catch(e) {
                console.error(e)
            }
        })

    }

    changedFilterHandler = e => {
        this.setState({
            filter: e.target.getAttribute('data-value')
        })
    }

    editTaskHandler = async (task, value) => {

        this.setState({
            loaderSm: true
        })

        const index = this.state.todolists.indexOf(task)
        if (value.length > 0) {
            const tasks = this.state.todolists.concat() 
            task.edit = !task.edit
            
            try {
                const index = this.state.todolists.indexOf(task)
                await axios.patch(`https://todolist-app-fb466.firebaseio.com/task/${this.state.dataKey[index]}.json`, task) 
        
                this.setState({
                    todolists:  tasks
                }) 
            } catch(e) {
                console.error(e)
            }

        } else {
            try {
                await axios.delete(`https://todolist-app-fb466.firebaseio.com/task/${this.state.dataKey[index]}.json`) 
    
                this.setState({
                    todolists: this.state.todolists.filter((t) => t !== task) 
                })

            } catch(e) {
                console.error(e)
            }
        }
    }

    hideInputEditHandler = async (task, event) => {

        this.setState({
            loaderSm: true
        })

        const index = this.state.todolists.indexOf(task)
        if (event.key === 'Enter') {
            if (event.target.value.length > 0) {
                const tasks = this.state.todolists.concat() 
                task.edit = !task.edit

                try {
                    const index = this.state.todolists.indexOf(task)
                    await axios.patch(`https://todolist-app-fb466.firebaseio.com/task/${this.state.dataKey[index]}.json`, task) 
            
                    this.setState({
                        todolists:  tasks
                    }) 
                } catch(e) {
                    console.error(e)
                }

            } else {
                try {
                    await axios.delete(`https://todolist-app-fb466.firebaseio.com/task/${this.state.dataKey[index]}.json`) 

                    this.setState({
                        todolists: this.state.todolists.filter((t) => t !== task) 
                    })

                } catch(e) {
                    console.error(e)
                }

            }
        }
        
    }

    editValueHandler = (task, value) => {
        const tasks = this.state.todolists.concat() 
        task.text = value

        this.setState({
            todolists:  tasks
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get('https://todolist-app-fb466.firebaseio.com/task.json') 
            
            const getTodolist = Object.values(response.data)
            
            this.setState({
                todolists: getTodolist,
                dataKey: Object.keys(response.data),
                loader: false
            })
        } catch(e) {
            console.error(e)
        }
        
    } 

    async componentDidUpdate(prevProps, prevState) {
        
        if (prevState.todolists !== this.state.todolists) {
            this.setState({
                loaderSm: false
            })
        }

        if (prevState.todolists.length !== this.state.todolists.length) {
            try {
                const response = await axios.get('https://todolist-app-fb466.firebaseio.com/task.json') 
                
                const getTodolist = Object.values(response.data)
                
                this.setState({
                    todolists: getTodolist,
                    dataKey: Object.keys(response.data)
                })
            } catch(e) {
                console.error(e)
            }
        }

        
        
    }

    render() {

        let filterTasks = [];

        if (this.state.filter === 'all') filterTasks = this.state.todolists
        if (this.state.filter === 'active') filterTasks = this.state.todolists.filter(t => t.completed === false)
        if (this.state.filter === 'completed') filterTasks = this.state.todolists.filter(t => t.completed === true)

        return (
            <div className={classes.Todolist} >
                {
                    this.state.loaderSm 
                    ?   <div className={classes.LoaderSm}>
                            <Loader />
                        </div>
                    : null
                }
                <h1 className={classes.title}>Todos</h1>

                <div className={classes.wrapper}>
                    <Input
                        onAddTask={this.onAddHandler}
                        taskLength={this.state.todolists.length}
                    />

                    {
                        this.state.loader
                        ? <Loader /> 
                        : <TaskLists
                        lists={filterTasks}
                        onDelete={this.onDeleteHandler}
                        toggleComplete={this.onToggleComplete}
                        editValueHandler={this.editValueHandler}
                        hideInputEditHandler={this.hideInputEditHandler}
                        editTaskHandler={this.editTaskHandler}
                        />
                    }

                    {
                        this.state.todolists.length !== 0 && this.state.loader === false
                        ? <TodoStatus
                            tasks={this.state.todolists}
                            filter={this.state.filter}
                            clearCompleted={this.clearCompletedHandler}
                            changedFilter={this.changedFilterHandler}
                        />
                        : null
                    }
                        
                </div>

            </div>
        )
    }
}

export default Todolist;