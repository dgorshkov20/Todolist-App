import React from 'react'
import classes from './About.module.scss'

class About extends React.Component {

    render() {
        return (
            <div className={classes.About}>
                <h1>Информация</h1>
                <p>Версия приложения 1.0.0</p>
            </div>
        )
    }
}

export default About