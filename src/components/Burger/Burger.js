import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // On store nos ingrédients dans un tableau d'Array
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igrKey => {
            return [ ...Array(props.ingredients[igrKey] )].map( (_, i ) => {
                return <BurgerIngredient key={igrKey + i} type={igrKey} />;
            });
        })
        .reduce( (prevEl, actualEl) => {
            // On regarde si notre tableau est vraiment vide en le regroupant avec reduce ([] est notre valeur initial)
            return prevEl.concat(actualEl)
        }, []);

    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients !</p>
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;