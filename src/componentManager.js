import * as Validate from './utils/validate';

export const ComponentManager = (storage, verbose) => {

  const _storage = storage;
  const _registeredComponents = new Map();

  const _log = (...$msg) => {
    if (verbose) {
      console.log('Component Manager: ', ...$msg);
    }
  };

  const _validate = (ComponentId, componentValue) => {
    //check if component is registered
    const c = _registeredComponents.get(ComponentId);
    if (typeof c === 'undefined') {
      return false;
    }

    //check if values are correct
    for (let [k, v] of Object.entries(c)) {
      const validateFunctionName = 'is' + v['type'].charAt(0).toUpperCase() + v['type'].slice(1);
      //if value is not passed and we have a default or value is optional then we are good
      if (typeof componentValue[k] === 'undefined' && (
        (typeof (v.optional) !== 'undefined' && v.optional === true) ||
        typeof (v.default) !== 'undefined')
      ) {
        continue;
      }
      //we have a value so we test
      if (!Validate[validateFunctionName](componentValue[k])) {
        _log(`${componentValue[k]} failed the validation ${validateFunctionName}`);
        return false;
      }
    }

    //check if extra non existent property were passed to component
    const defaultSchema = Object.keys(c);
    for (const k of Object.keys(componentValue)) {
      if (!defaultSchema.includes(k)) {
        _log(`${k} is not a valid property for the ${ComponentId} Component.`);
        return false;
      }
    }

    return true;
  };

  const add = (entityId, ComponentId, value = {}) => {
    if (_validate(ComponentId, value)) {
      const c = _registeredComponents.get(ComponentId);
      const defaultValues = Object.fromEntries(Object.entries(c).map(([k, v]) => {
        return [k, v.default];
      }));
      return _storage.addEntityComponent(entityId, ComponentId, Object.assign(defaultValues, value));
    } else {
      _log(`Component ${ComponentId} could not added to ${entityId} due to fail validation`);
      return false;
    }
  };

  const remove = (entityId, ComponentId) => {
    return _storage.removeEntityComponent(entityId, ComponentId);
  };

  const register = (component) => {
    if(!component.hasOwnProperty('name')) {
      return false;
    }
    _log(`Registering ${component.name} Component`)
    const data = component.data || {};
    return _registeredComponents.set(component.name, data);
  };

  return {
    add,
    remove,
    register,
  };
};
