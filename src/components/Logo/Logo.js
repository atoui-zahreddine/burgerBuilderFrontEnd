import React from 'react';
import BurgerLogo from '../../assets/images/burger-logo.png';
import Classes from    './Logo.module.css';
import { Link } from 'react-router-dom';

const burgerLogo = () => {
    return (
        <div className={Classes.logo} >
            <Link to='/'>  <img src={BurgerLogo} alt='MyBurger'/></Link>
        </div>
    );
}

export default burgerLogo;