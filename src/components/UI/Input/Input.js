import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let errorMessage = null;

    const inputClasses = [classes.InputElement]

    if (props.invalid && props.touched){
        errorMessage = <p className={classes.ErrorMessage}>Please enter a valid {props.inputType}.</p>;
    }

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>{option.displayValue}</option>
                        ))}
                </select>
            );
            break;
        default:
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}/>;
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.Label}</label>
            {inputElement}
            {errorMessage}
        </div>
    );
}

export default input;