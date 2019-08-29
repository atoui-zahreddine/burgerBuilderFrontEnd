import React from 'react';
import Classes from './Order.module.css';

const order = (props)=> {
    let ingredients=[];
    for(let ingredient in props.ingredients){
        ingredients.push(ingredient+' ('+props.ingredients[ingredient]+')');
    }
    return (
        <div className={Classes.Order}>
            <p>ingredients :{ingredients.join(' ')}</p>
            <p>Price :USD <strong>{props.price}</strong> </p>
        </div>
    );
}
export default order;