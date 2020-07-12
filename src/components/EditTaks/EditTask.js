import React from 'react'
import classes from './EditTask.module.scss'

const EditTask = props => {

    return (
        <React.Fragment>
            <input 
                className={classes.EditTask}  
                type="text" 
                value={props.task.text}
                onChange={(event) => props.editValueHandler(props.task, event.target.value)}
                autoFocus
            />
        </React.Fragment>
    )

}

export default EditTask