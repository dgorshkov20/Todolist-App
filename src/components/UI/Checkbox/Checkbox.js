import React from 'react'
import classes from './Checkbox.module.scss'

const Checkbox = props => (


            
            <div className={classes.cntr}>
               
                <label 
                    className={classes.labelCbx}
                    htmlFor={`cbx_${props.index}`} 
                    
                >
                <input 
                    className={classes.invisible}
                    id={`cbx_${props.index}`} 
                    type="checkbox"
                    checked={props.task.completed}
                    onChange={() => props.toggleComplete(props.task)}
                />
                <div className={classes.checkbox}>
                    <svg width="25px" height="25px" viewBox="0 0 20 20">
                    <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                    <polyline points="4 11 8 15 16 6"></polyline>
                    </svg>
                </div>
                </label>
            </div>


)



export default Checkbox