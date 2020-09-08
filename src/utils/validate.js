import {ValidationError} from './errors'

export const isNumber = (value) => {
    return !isNaN(value)
}

export const isAny = (value) => {
    if (typeof (value) !== 'undefined') {
        return true;
    }
    return false;
}

export const isString = (value) => {
    if (typeof value === 'string' || value instanceof String) {
        return true;
    }
    return false;
}

export const isEnum = (value, allowed) => {
    return allowed.includes(value)
}

export const isArray = (value, type) => {
    //check if array
    if (!Array.isArray(value)) {
        return false
    }

    //not checking types
    if(typeof type == 'undefined') {
        return true
    }

    //check type
    let res = false;
    switch (type) {
        case 'string':
            res = value.reduce((acc, cur) => {
                return acc && isString(cur)
            }, true)
            break;
        case 'number':
            res = value.reduce((acc, cur) => {
                return acc && isNumber(cur)
            }, true)
            break;
        case 'components':
            res = value.reduce((acc, cur) => {
                return acc && isComponent(cur)
            }, true)
            break;
        case 'mixed' :
            res = true;
            break;
        case 'any':
            res = true;
            break;
        default:
            throw new ValidationError(`Type ${type} not supported in Array`);
    }
    return res;
}

export const isMap = (value, type) => {
    if (! (value instanceof Map)) {
        return false
    }

    let values = Array.from(value.values())

    return isArray(values, type)

}

export const isSet = (value, type) => {
    if (! (value instanceof Set)) {
        return false
    }

    let values = Array.from(value.values())

    return isArray(values, type)
}

export const isComponent = (value) => {
    if (!value.hasOwnProperty('name')) {
        return false;
    }

    // data is optional because we can have flag components
    // but if we have data, it must have the correct structure
    if (value.hasOwnProperty('data')) {
        //check if data is an object and make sure all entries have a type property defined.
        const data = Object.entries(value.data);
        //if value.data is not iterable, then it returns an empty array
        if (data.length == 0) {
            return false
        }
        //check that the actual values of data are correct.
        return data.reduce((acc, cur) => {
            return acc
                && cur.length > 1
                && isString(cur[0]) // property key must be a string
                && cur[1].hasOwnProperty('type') // value of each data must contain a `type` property
                && isEnum(cur[1]['type'], ['string', 'number', 'any', 'mixed']) // check if `type` is supported
        }, true)
        
    }

    return true;


}