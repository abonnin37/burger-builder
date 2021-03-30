import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igrKey => {
            return  <li key={igrKey}>
                <span style={{textTransform: 'capitalize'}}>{igrKey}</span>: {props.ingredients[igrKey]}
            </li>
        });

    return (
        <React.Fragment>
            <h3>Tour Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout ?</p>
            <Button
                clicked={props.purchaseCancelled}
                btnType="Danger">CANCEL</Button>
            <Button
                clicked={props.purchaseContinue}
                btnType="Success">CONTINUE</Button>
        </React.Fragment>
    );
}

export default orderSummary;