import React from 'react'
import Checkbox from '../../UI/Checkbox/Checkbox'
import EditTask from '../../EditTaks/EditTask'
import classes from './TaskItem.module.scss'

const TaskItem = props => {

    let cls = [classes.TaskItem];
    
    if (props.task.completed) {
        cls.push(classes.line)
    }

    return (
        <li className={cls.join(' ')}
            onDoubleClick={() => props.editTaskHandler(props.task)}
            onKeyPress={(event) => props.hideInputEditHandler(props.task, event)}
        >
            <Checkbox 
                task={props.task}
                index={props.index}
                toggleComplete={props.toggleComplete}  
            />
            { props.task.text }
            <div 
                className={classes.clear}
                onClick={() => props.onDelete(props.task)}
            >&#10006;
            </div>
            {
                props.task.edit ?
                <EditTask 
                    task={props.task}
                    editValueHandler={props.editValueHandler}
                    editTask={props.editTaskHandler}
                />
                : null
            }
            
        </li>
    )
}

export default TaskItem