import React from 'react';
import Classes from './Order.module.css';
import Burger from "../Burger/Burger";

const order = (props)=> {
    let ingredients=[];
    for(let ingredient in props.ingredients){
        ingredients.push(ingredient+' ('+props.ingredients[ingredient]+')');
    }
    return (
        <div className={Classes.Order}>
            <div>
                <Burger ingredients={props.ingredients} classe={Classes.Burger}/>
            </div>
            <p className={Classes.Ingredients}><span> ingredients :</span>{ingredients.join(' ')}</p>
            <p className={Classes.Price}><span>Price:</span><strong>{props.price} $</strong> </p>
        </div>
    );
}
export default order;