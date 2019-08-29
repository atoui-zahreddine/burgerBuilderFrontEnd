import React from 'react';
import Logo from '../../Logo/Logo';
import Classes from    './Toolbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
    return (
        <header className={Classes.Toolbar}>
            <div onClick={props.clicked} className={Classes.Menu}>
                <FontAwesomeIcon icon={faBars} size='2x' color='white'/>
            </div>
            <div className={Classes.Logo}>
                <Logo />
            </div>
            <nav className={Classes.onlyDesktop}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default toolbar;