import {
    typeOptions,
    propsErrorOptions
} from './const';

function isPresentInArray(array, value) {
    for (let index = 0; index < array.length; index++) {
        if(value === array[index]) return true;
    }
    return false;
}
function isBoolean(value) {
    return typeof value === 'boolean';
}

export function validateProps(props) {
    const { type, isRequired, isError } = props;
    if(!isPresentInArray(Object.keys(typeOptions), type || 'text')) throw new Error(propsErrorOptions.INVALID_INPUT_TYPE);
    // if(isRequired && !isBoolean(isRequired)) throw new Error(propsErrorOptions.INVALID_INPUT_IS_REQUIRED);
    // if(isError && !isBoolean(isError)) throw new Error(propsErrorOptions.INVALID_INPUT_IS_ERROR);
    return {status: false};
}