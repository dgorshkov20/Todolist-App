import React from 'react'
import classes from './TodoStatus.module.scss'

const TodoStatus = props => {

    const cls = [classes.filterValue, classes.active];
    const filterFalse = props.tasks.filter(task => task.completed === false)
    const filterTrue = props.tasks.filter(task => task.completed === true)

    return (
        <div className={classes.TodoStatus}>

            <div>
                <span>{ filterFalse.length } items left</span>
            </div>

            <div
                onClick={event => props.changedFilter(event)}
                className={classes.filter}
             >
                <span 
                    className={props.filter === 'all' ? cls.join(' ') : classes.filterValue} 
                    data-value="all"
                >All</span>
                <span 
                    className={props.filter === 'active' ? cls.join(' ') : classes.filterValue} 
                    data-value="active"
                >Active</span>
                <span 
                    className={props.filter === 'completed' ? cls.join(' ') : classes.filterValue} 
                    data-value="completed"
                >Completed</span>
            </div>

            <div className={classes.clearBlock}>
                {
                    filterTrue.length !== 0
                    ? <span 
                        className={classes.clearCompleted}
                        onClick={() => props.clearCompleted()}
                    >Clear completed</span>
                    : null
                }
                
            </div>

        </div>
    )
}

export default TodoStatus