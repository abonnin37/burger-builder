import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];

    for (const ingredientName in props.ingredients) {
        if (Object.hasOwnProperty.call(props.ingredients, ingredientName)) {
            ingredients.push({
                name: ingredientName, 
                amount: props.ingredients[ingredientName]
            });

        }
    }

    const ingredientsOutput = ingredients.map(ig => {
        return <span 
                key={ig.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px',
                }}>{ig.name} ({ig.amount})</span>;
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} €</strong></p>
        </div>
    );
}

export default order;