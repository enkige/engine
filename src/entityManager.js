import {v4 as uuidv4} from 'uuid';

export const EntityManager = (storage) => {
  const _storage = storage;

  /**
   * Add a new entity
   * @param {string} [id] - Entity Id
   * @returns {string} - Entity Id
   */
  const add = (id) => {
    const entity = id  || uuidv4();
    _storage.addEntity(entity);
    return entity;
  };

  /**
   * Remove an entity
   * @param {*} entity - Entity Id to remove
   * @returns {boolean} - True if successful, else false
   */
  const remove = (entity) => {
    return _storage.removeEntity(entity);
  };

  /**
   * Retrieve an entity and its components
   * @param {*} id - Entity Id
   * @returns {{id:string, components: Map}} - Entity Object with id and components. Undefined if it does not exists
   */
  const get = (id) => {
    const eid = _storage.getEntity(id);
    if(typeof eid == 'undefined') {
      return;
    }
    const components = _storage.getEntityComponents(eid)
    return {
      id: eid,
      components: components
    };
  };

  /**
   * Retrieve all entities stored
   * @returns {Iterator} - Iterator that list all entities
   */
  const list = () => {
    return _storage.getEntities().values();
  };

  return {
    add,
    get,
    list,
    remove,
  };
};
