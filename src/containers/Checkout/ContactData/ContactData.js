import react, { Component } from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
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
            orderData: formData
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push({
                    pathname: '/'
                });
            })
            .catch(error => {
                this.setState({ loading: false });
            });

    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required && isValid) {
            // trim enlève tout les espaces blancs
            isValid = value.trim() !== '';

        }

        if (rules.minLength && isValid){
            isValid = value.length >= rules.minLength;
        }

        if (rules.maxLenght && isValid){
            isValid = value.length <= rules.maxLenght;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        // On copie OrderForm 
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        // On copie l'élément voulut de OrderForm car si on l'altère directement on va modifier la référence directe à l'élément
        const updatedOrderFormElement = {
            ...updatedOrderForm[inputId]
        }
        // Une fois sécurisé, on peut updater la value de l'élément voulut
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation)
        updatedOrderFormElement.touched = true;
        // Updater l'orderForm entier
        updatedOrderForm[inputId] = updatedOrderFormElement;

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
        if (this.state.loading) {
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
        ings: state.ingredients,
        totalPrice: state.totalPrice,
    }
}

export default connect(mapStateTopProps)(ContactData);