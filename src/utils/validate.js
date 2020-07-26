
export const isNumber = (value) => {
  return !isNaN(value)
}

export const isAny = (value) => {
  if(typeof(value) !== 'undefined'){
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
  const isArray = Array.isArray(value);
  if(!isArray)  {
    return false
  }
  //check type

  let res = false;
  switch (type) {
    case 'string':
      res = value.reduce((acc,cur) => {
        return acc && isString(cur)
      }, true)
      break;
    case 'number':
      res = value.reduce((acc,cur) => {
        return acc && isNumber(cur)
      }, true)
      break;
    case 'mixed' : res = true; break;
    case 'any': res = true; break;
    default:
      throw new TypeError(`Type ${type} not supported in Array`);
  }
  return res;
}
