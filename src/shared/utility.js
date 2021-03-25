export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required && isValid) {
        // trim enlève tout les espaces blancs
        isValid = value.trim() !== '';

    }

    if (rules.minLength && isValid) {
        isValid = value.length >= rules.minLength;
    }

    if (rules.maxLenght && isValid) {
        isValid = value.length <= rules.maxLenght;
    }

    return isValid;
}