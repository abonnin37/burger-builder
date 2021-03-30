import React, { useState, useEffect, useCallback } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuilControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    // New way of using redux with hooks
    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetRedirectAuthPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igrKey => {
                return ingredients[igrKey];
            })
            .reduce( (sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated){
            setPurchasing(true);
        } else {
            onSetRedirectAuthPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push({
            pathname: "/checkout"
        });
    }

    const disabledInfo = {
        ...ings
    };
    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (ings) {
        burger = (
            <React.Fragment>
                <Burger ingredients={ings}/>
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    price={totalPrice}
                    purchaseable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated} />
            </React.Fragment>
        );

        orderSummary = <OrderSummary
            ingredients={ings}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinue={purchaseContinueHandler}
            price={totalPrice}/>;
    }

    return (
        <React.Fragment>
            <Modal
                show={purchasing}
                modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );
}

export default withErrorHandler(burgerBuilder, axios);