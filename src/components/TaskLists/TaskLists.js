import React from 'react'
import TaskItem from './TaskItem/TaskItem'
import classes from './TaskLists.module.scss'

const TaskLists = props => {

    const lists = props.lists.map((list, index) => {
        return (
            <TaskItem 
                key={index}
                index={index}
                task={list}
                onDelete={props.onDelete}
                toggleComplete={props.toggleComplete}
                editValueHandler={props.editValueHandler}
                editTaskHandler={props.editTaskHandler}
                hideInputEditHandler={props.hideInputEditHandler}
            />
        )
    })

    return (
        <ul className={classes.TaskLists}>
            { lists }
        </ul>
    )
}

export default TaskLists