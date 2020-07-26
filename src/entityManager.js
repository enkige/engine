import {v4 as uuidv4} from 'uuid';

export const EntityManager = (storage) => {
  const _storage = storage;

  const add = (template) => {
    const entity = uuidv4();
    _storage.addEntity(entity);
    return entity;
  };

  const remove = (entity) => {
    _storage.removeEntity(entity);
  };

  const get = (id) => {
    _storage.getEntity(id);
    return id;
  };

  const getAll = () => {
    return _storage.getEntities().values();
  };

  return {
    add,
    get,
    getAll,
    remove,
  };
};
