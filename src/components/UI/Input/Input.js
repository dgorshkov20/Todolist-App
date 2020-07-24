import React from 'react'
import classes from './Input.module.scss'

const Input = props => {
    
    let cls = [classes.Input];
    if (props.taskLength > 0) {
        cls.push(classes.InputActive)
    }

    return (
        <div>
            <input 
                className={cls.join(' ')} 
                type="text" 
                placeholder="Что нужно сделать?" 
                maxLength="35"
                onKeyDown={(event) => props.onAddTask(event)}
            />  
        </div>
    )
}

export default Input