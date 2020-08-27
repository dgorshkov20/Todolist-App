import React from 'react'
import classes from './EditTask.module.scss'

const EditTask = props => {

    return (
        <React.Fragment>
            <input 
                className={classes.EditTask}  
                type="text" 
                value={props.task.text}
                maxLength="35"
                onChange={(event) => props.editValueHandler(props.task, event.target.value)}
                onBlur={(event) => props.editTask(props.task, event.target.value)}
                autoFocus
            />
        </React.Fragment>
    )

}

export default EditTask