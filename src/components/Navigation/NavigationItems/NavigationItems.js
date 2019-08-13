import React from 'react';
import Classes from './NavigationItems.module.css';
import {NavLink} from 'react-router-dom';


const navigationItems = () => {
    return (
            <ul className={Classes.NavigationItems}>
                <li className={Classes.NavigationItem} ><NavLink exact activeClassName={Classes.active} to='/'>Burger Builder</NavLink></li>
                <li className={Classes.NavigationItem} ><NavLink exact activeClassName={Classes.active}  to='/checkout'>Checkout</NavLink></li>
            </ul>
    );
}

export default navigationItems;