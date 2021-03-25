import React, {Component} from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igrKey => {
            return  <li key={igrKey}>
                        <span style={{textTransform: 'capitalize'}}>{igrKey}</span>: {this.props.ingredients[igrKey]}
                    </li>
        });

        return (
            <React.Fragment>
                <h3>Tour Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout ?</p>
                <Button 
                    clicked={this.props.purchaseCancelled}
                    btnType="Danger">CANCEL</Button>
                <Button
                    clicked={this.props.purchaseContinue}
                    btnType="Success">CONTINUE</Button>
            </React.Fragment>
        );
    }
}

export default OrderSummary;