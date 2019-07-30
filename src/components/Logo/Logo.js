import React from 'react';
import BurgerLogo from '../../assets/images/burger-logo.png';
import Classes from    './Logo.module.css';

const burgerLogo = () => {
    return (
        <div className={Classes.logo} >
            <img src={BurgerLogo} alt='MyBurger'/>
        </div>
    );
}

export default burgerLogo;