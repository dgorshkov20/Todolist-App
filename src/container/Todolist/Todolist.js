import React from 'react'
import classes from './Todolist.module.scss'
import Input from '../../components/UI/Input/Input'
import TaskLists from '../../components/TaskLists/TaskLists'
import TodoStatus from '../../components/TodoStatus/TodoStatus'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {fetchTodo, 
        TodoUpdate, 
        addTask, 
        deleteTask,
        toggleCompleted,
        changedFilter,
        clearAllCompleted,
        editTask,
        editTaskValue,
        editModeOff} from '../../store/actions/todolist'

class Todolist extends React.Component {
    
    onAddHandler = event => {
        this.props.addTask(event)
    } 

    onDeleteHandler = task => {
        this.props.deleteTask(task)
    }

    onToggleComplete = task => {
        this.props.toggleCompleted(task)
    }

    changedFilterHandler = e => {
        this.props.changedFilter(e)
    }

    clearCompletedHandler = () => {
        this.props.clearAllCompleted()
    }

    editTaskHandler = (task, value) => {
        this.props.editTask(task, value)
    }

    hideInputEditHandler = (task, event) => {
        this.props.editModeOff(task, event)
    }

    editValueHandler = (task, value) => {
        this.props.editTaskValue(task, value)
    }

    componentDidMount() {
        this.props.fetchTodo()        
    } 

    componentDidUpdate(prevProps) {
        this.props.TodoUpdate(prevProps)
    }

    render() {


        let filterTasks = [];

        if (this.props.filter === 'all') filterTasks = this.props.todolists
        if (this.props.filter === 'active') filterTasks = this.props.todolists.filter(t => t.completed === false)
        if (this.props.filter === 'completed') filterTasks = this.props.todolists.filter(t => t.completed === true)

        return (
            <div className={classes.Todolist} >
                {
                    this.props.loaderSm 
                    ?   <div className={classes.LoaderSm}>
                            <Loader />
                        </div>
                    : null
                }
                <h1 className={classes.title}>Todos</h1>

                <div className={classes.wrapper}>
                    <Input
                        onAddTask={this.onAddHandler}
                        taskLength={this.props.todolists.length}
                    />

                    {
                        this.props.loader
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
                        this.props.todolists.length !== 0 && this.props.loader === false
                        ? <TodoStatus
                            tasks={this.props.todolists}
                            filter={this.props.filter}
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

function mapStateToProps(state) {
    return {
        todolists: state.todolist.todolists,
        dataKey: state.todolist.dataKey,
        filter: state.todolist.filter,
        loader: state.todolist.loader,
        loaderSm: state.todolist.loaderSm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTodo: () => dispatch(fetchTodo()),
        TodoUpdate: prevProps => dispatch(TodoUpdate(prevProps)),
        addTask: event => dispatch(addTask(event)),
        deleteTask: task => dispatch(deleteTask(task)),
        toggleCompleted: task => dispatch(toggleCompleted(task)),
        changedFilter: e => dispatch(changedFilter(e)),
        clearAllCompleted: () => dispatch(clearAllCompleted()),
        editTask: (task, value) => dispatch(editTask(task, value)),
        editTaskValue: (task, value) => dispatch(editTaskValue(task, value)),
        editModeOff: (task, event) => dispatch(editModeOff(task, event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);