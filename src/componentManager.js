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
      _log(`Component ${ComponentId} is not registered`);
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
      // 'any' type of data is not validated.
      if(v.type == 'any'){
        continue;
      }
      //we have a value so we test
      let args = [];
      if(v.type == 'enum') {
        args.push(v.allowed);
      }
      if(v.type == 'array'){
        args.push(v.childType);
      }
      if (!Validate[validateFunctionName](componentValue[k],...args)) {
        _log(`${k} => ${componentValue[k]} failed the validation ${validateFunctionName}`);
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

  /**
   * Add a Component to an existing entity
   * @param {any} entityId - Entity Id
   * @param {string} ComponentId - Component type to add
   * @param {object} value - Object following the data structure of component to pass initial values to component
   * @returns {boolean} True if succesfull else false
   */
  const add = (entityId, ComponentName, value = {}) => {
    if (_validate(ComponentName, value)) {
      const c = _registeredComponents.get(ComponentName);
      const defaultValues = Object.fromEntries(Object.entries(c).map(([k, v]) => {
        return [k, v.default];
      }));
      _storage.addEntityComponent(entityId, ComponentName, Object.assign(defaultValues, value));
      return true;
    } else {
      _log(`Component ${ComponentName} could not added to ${entityId} due to fail validation.`);
      return false;
    }
  };

  /**
   * Remove a component from an existing Entity
   * @param {any} entityId - Entity Id
   * @param {string} ComponentName - Component to remove
   * @returns {boolean} - True if successfull else false
   */
  const remove = (entityId, ComponentName) => {
    return _storage.removeEntityComponent(entityId, ComponentName);
  };

  /**
   * Register a new component type
   * @param {object} componentSchema
   * @returns {boolean} - True if successfull, else false
   */
  const register = (componentSchema) => {
    if(!componentSchema.hasOwnProperty('name')) {
      return false;
    }
    _log(`Registering ${componentSchema.name} Component`)
    const data = componentSchema.data || {};
    _registeredComponents.set(componentSchema.name, data);
    return true;
  };

  const list = () => {
    return new Map(_registeredComponents)
  }

  const isRegistered = (name) => {
    return _registeredComponents.has(name);
  }

  const dump = () => {
    return {components: Array.from(_registeredComponents.values())}
  }

  return {
    add,
    remove,
    register,
    list,
    isRegistered,
    dump
  };
};
