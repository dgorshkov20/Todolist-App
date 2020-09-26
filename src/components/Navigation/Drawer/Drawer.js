import React from 'react'
import classes from './Drawer.module.scss'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'

class Drawer extends React.Component {

    renderLinks = (links) => {
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

        const links = []

        if (this.props.isAuthenticated) {
            links.push({to: '/', label: 'Список дел', exact: true})
            links.push({to: '/about', label: 'Информация', exact: true})
            links.push({to: '/logout', label: 'Выход', exact: true})
        } else {
            links.push({to: '/auth', label: 'Авторизация', exact: true})
            links.push({to: '/about', label: 'Информация', exact: true})
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
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