import React from 'react'
import classes from './Drawer.module.scss'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'

class Drawer extends React.Component {

    renderLinks = () => {
        const links = [
            {to: '/', label: 'Список дел', exact: true},
            {to: '/auth', label: 'Авторизация', exact: true},
            {to: '/about', label: 'Информация', exact: true}
        ]

        return links.map((link, index) => {
            return (
                <li
                    className={classes.links}
                    key={index}
                >
                <NavLink 
                    to={link.to}
                    exact={link.exact}
                    activeClassName={classes.active}
                    onClick={() => this.props.onClose()}
                >
                    {link.label}
                </NavLink> 
                </li>
            )
        })
    }


    render() {

        const cls = [classes.Drawer]

        if (this.props.isOpen) {
            cls.push(classes.DrawerOpen)
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {
                    this.props.isOpen 
                    ? <Backdrop 
                        onClick={() => this.props.onClose()}
                    />
                    : null
                }
            </React.Fragment>
        )
    }
}

export default Drawer