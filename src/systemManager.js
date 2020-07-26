import {isString, isArrayOf} from './utils/validate';

export const SystemManager = (storage, verbose) => {

  const _storage = storage;
  const _registeredSystems = new Map();


  const _log = ( ...$msg) => {
    if(verbose) {
      console.log('System Manager: ',...$msg)
    }
  }

  const _query = (q) => {
    return _storage.getEntityByComponents(q);
  }

  const _validate = (system) => {
    //check that system is a function with the correct prototype
    if(!typeof(system) === 'function' || !system.hasOwnProperty('query') || !system.hasOwnProperty('name')) {
      _log('Trying to register a system that is either not a function or does not have a name and query defined');
      return false;
    }
    if(!isString(system.name)){
      _log(`The name of a system must be a string`);
      return false
    }

    if(!isArrayOf(system.query, 'string')){
      _log(`System ${system.name} does not have a correct query. A query must be an array of string.`)
    }

    return true
  }

  const execute = () => {
    // loop through all systems
    for(let [name, system] of _registeredSystems){
      const entities = _query(system.query);
      entities.forEach((e) => {
        system(_storage.getEntityComponents(e))
      })
    }
  }

  const register = (system) => {
    if(_validate(system)){
      _log(`Registering ${system.name} System`)
      _registeredSystems.set(system.name, system);
    } else {
      return false;
    }
  }

  return {
    execute,
    register
  }

}