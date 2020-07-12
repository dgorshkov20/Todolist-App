import React from 'react'
import classes from './Input.module.scss'

const Input = props => {

    return (
        <div>
            <input 
                className={classes.Input} 
                type="text" 
                placeholder="What need to be done?" 
                onKeyDown={(event) => props.onAddTask(event)}
            />
        </div>
    )
}

export default Input