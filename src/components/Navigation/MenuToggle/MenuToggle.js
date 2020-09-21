import React from 'react'
import classes from './MenuToggle.module.scss'

const MenuToggle = props => {

    const cls = ['fas']

    if (props.openMenu) {
        cls.push('fa-times')
        cls.push(classes.open)
    } else {
        cls.push('fa-bars')
    }

    return (
        <div className={classes.MenuToggle}>
            <i 
            className={cls.join(' ')}
            onClick={() => props.toggleMenuHandler()}
            ></i>
        </div>
    )
}

export default MenuToggle