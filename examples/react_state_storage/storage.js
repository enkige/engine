/**
 *
 * @param {value, set} entities - Object to retrieve and set the entities for React State
 * @param {value, set} componentMap - Object to retrieve and set the componentMap for React State
 * @param {value, set} entityComponents - Object to retrieve and set the entityComponents for React State
 * @returns {function(*): {addEntity: (function(*=): Set<any>), removeEntityComponent: removeEntityComponent, getEntityComponents: getEntityComponents, getEntities: (function(): Set<any>), addEntityComponent: addEntityComponent, getEntity: getEntity, removeEntity: (function(*=): Set<any>), getEntityByComponents: getEntityByComponents}}
 * @constructor
 */
export const ReactStateStorageFactory = (entities, componentMap, entityComponents) => {

  return function ReactStateStorage (verbose) {
    const _entities = entities;
    const _componentMap = componentMap;
    const _entityComponents = entityComponents;

    const addEntity = (entityId) => {
      console.log(`Adding entity with id ${entityId}`);
      const e = new Set(_entities.value);
      e.add(entityId);
      _entities.set(e);
      return e;
    };

    const removeEntity = (entityId) => {
      console.log(`Deleting entity with id ${entityId}`);
      const e = new Set(_entities.value);
      e.delete(entityId);
      entities.set(e);
      return e;
    };

    const getEntity = (entityId) => {
      return;
    };

    const getEntities = () => {
      //returning a new set so users can not override the Entities Set by inadvertence
      return new Set(_entities.value);
    }

    const getEntityComponents = (entityId) => {

    };

    const getEntityByComponents = (components) => {

    };

    const addEntityComponent = (entity, componentId, component) => {

    };

    const removeEntityComponent = (entity, component) => {

    };

    return {
      addEntity,
      removeEntity,
      getEntity,
      getEntities,
      addEntityComponent,
      removeEntityComponent,
      getEntityByComponents,
      getEntityComponents,
    };
  };

};

