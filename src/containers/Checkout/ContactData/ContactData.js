import react, { Component } from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLenght: 5,
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                touched: false
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        // On empêche le form d'avoir son comportement par défault
        event.preventDefault();
        this.setState({ loading: true });

        const formData = {};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice, //in a real app we calculate the price in the serveur for security reason
            orderData: formData,
            userId: this.props.userId
        };

        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputId) => {
        // On copie l'élément voulut de OrderForm car si on l'altère directement on va modifier la référence directe à l'élément
        const updatedOrderFormElement = updateObject(this.state.orderForm[inputId], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputId].validation),
            touched: true
        });
        // On copie OrderForm 
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputId]: updatedOrderFormElement
        });

        // On check si tout le formulaire est prêt pour être envoyer au back-end
        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }

        // Et updater le state
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id} 
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        defaultValue={formElement.config.value} 
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        // On check si le champs validation est présent dans notre state
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        inputType={formElement.id}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateTopProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToPros = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
}

export default connect(mapStateTopProps, mapDispatchToPros)(withErrorHandler(ContactData, axios));