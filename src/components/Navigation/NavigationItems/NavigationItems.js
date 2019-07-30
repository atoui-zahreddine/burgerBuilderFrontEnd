 import React from 'react';
import Classes from './NavigationItems.module.css';

const navigationItems = () => {
    return (
            <ul className={Classes.NavigationItems}>
                <li className={[Classes.NavigationItem,Classes.active].join(' ')} ><a href='./'>Burger Builder</a></li>
                <li className={Classes.NavigationItem} ><a href='./'>Checkout</a></li>
            </ul>
    );
}

export default navigationItems;