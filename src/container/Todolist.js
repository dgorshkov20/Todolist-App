import React from 'react'
import Input from '../components/UI/Input/Input'
import TaskLists from '../components/TaskLists/TaskLists'
import TodoStatus from '../components/TodoStatus/TodoStatus'
import classes from './Todolist.module.scss'


class Todolist extends React.Component {

    state = {
        todolists: [],
        filter: ''
    }

    onAddHandler = (event) => {
        if (event.key === 'Enter') {
            if (event.target.value !== '' && event.target.value.length < 35) {

                const tasks = this.state.todolists.concat() 
    
                const task = {
                    id: Math.random(),
                    text: event.target.value,
                    completed: false,
                    edit: false
                }
    
                tasks.push(task)
    
                event.target.value = ''

                
    
                this.setState({
                    todolists: tasks
                })
            }
            
        } 
    } 

    onDeleteHandler = task => {
        this.setState({
            todolists: this.state.todolists.filter((i) => i !== task) 
        })
    }

    onToggleComplete = task => {
        const tasks = this.state.todolists.concat() 
        const toggle = tasks.filter(t => t === task)
        toggle[0].completed = !task.completed

        this.setState({
            todolists:  tasks
        })
    }

    clearCompletedHandler = () => {
        const tasks = this.state.todolists.concat() 

        this.setState({
            todolists: tasks.filter(task => task.completed === false)
        })

    }

    changedFilterHandler = e => {
        
        this.setState({
            filter: e.target.getAttribute('data-value')
        })
    }

    editTaskHandler = task => {
        const tasks = this.state.todolists.concat() 
        const edit = tasks.filter(e => e === task)
        edit[0].edit = !task.edit

        this.setState({
            todolists:  tasks
        })
    }

    editValueHandler = (task, value) => {
        const tasks = this.state.todolists.concat() 
        const edit = tasks.filter(e => e === task)
        edit[0].text = value


        this.setState({
            todolists:  tasks
        })
    }

    hideInputEditHandler = (task, event) => {
        console.log(event.keyCode)
        if (event.key === 'Enter'){
            const tasks = this.state.todolists.concat() 
            const edit = tasks.filter(e => e === task)
            edit[0].edit = !task.edit

            this.setState({
                todolists:  tasks
            })
        }
        
    }

    componentWillMount() {
        const getTodolist = localStorage.getItem('state')

        this.setState({
            todolists: JSON.parse(getTodolist),
            filter: localStorage.getItem('filter')
        })
    } 

    render() {

        let filterTasks = [];

        if (this.state.filter === 'all') filterTasks = this.state.todolists
        if (this.state.filter === 'active') filterTasks = this.state.todolists.filter(t => t.completed === false)
        if (this.state.filter === 'completed') filterTasks = this.state.todolists.filter(t => t.completed === true)

        localStorage.setItem('state', JSON.stringify(this.state.todolists))
        localStorage.setItem('filter', this.state.filter)

        return (
            <div className={classes.Todolist} >
                <h1 className={classes.title}>Todos</h1>

                <div className={classes.wrapper}>
                    <Input
                        onAddTask={this.onAddHandler}
                    />

                    <TaskLists
                        lists={filterTasks}
                        editValueHandler={this.editValueHandler}
                        onDelete={this.onDeleteHandler}
                        hideInputEditHandler={this.hideInputEditHandler}
                        toggleComplete={this.onToggleComplete}
                        editTaskHandler={this.editTaskHandler}
                    />

                    {
                        this.state.todolists.length !== 0
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