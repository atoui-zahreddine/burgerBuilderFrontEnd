import React from 'react';
import Classes from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className={Classes.CheckoutSummary}>
            <h1>We hope it tasts well !!</h1>
            <div  >
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Danger' clicked={props.checkoutCanceled} >Cancel</Button>
            <Button btnType='Success' clicked={props.checkoutContinued}  >Continue</Button>
        </div>
    );
}
export default checkoutSummary;