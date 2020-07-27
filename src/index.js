import { EntityManager } from './entityManager.js';
import { ComponentManager } from './componentManager.js';
import { SystemManager } from './systemManager.js';
import { Storage } from './storage/index.js';

/**
 * Create an Enki Engine instance
 * @param {string} storageType - The type of storage to use, either 'MemoryStorage' or 'custom'
 * @param {string} mode - debug or production.
 * @param {func} storageInstance - a Storage instance, only used if storageType is set to 'custom'
 * @param {any} rest - unused at the moment
 * @returns {{EntityManager: {add: (function(*): string), remove: remove}, ComponentManager: {add: add, remove: (function(*=, *=): boolean|*), register: register}, SystemManager: {execute: execute, register: register}}}
 * @constructor
 */
const Engine = ({storageType = 'MemoryStorage', mode = 'production', storageInstance = null, ...rest} = {}) => {

  //get storage
  console.log(`Starting Enki ECS Engine with ${storageType}`)

  const verbose = mode == 'debug' ? true : false;
  let storage = null;
  if(storageType == 'custom') {
    storage = storageInstance(verbose);
  } else {
    storage = Storage[storageType](verbose);
  }

  const entityMgr = EntityManager(storage, verbose);

  const componentMgr = ComponentManager(storage, verbose);

  const systemMgr = SystemManager(storage, verbose);

  return {
    EntityManager: entityMgr,
    SystemManager: systemMgr,
    ComponentManager: componentMgr
  }

}

export default Engine;
