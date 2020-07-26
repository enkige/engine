/**
 *
 * @param verbose
 * @returns {{addEntity: (function(*): Set<any>), removeEntityComponent: removeEntityComponent, getEntityComponents: (function(*): any), getEntities: (function(): Set<*>), addEntityComponent: addEntityComponent, getEntity: (function(*=): *), removeEntity: (function(*=): boolean), getEntityByComponents: (function(Array): *)}}
 * @constructor
 */
export const MemoryStorage = (verbose) => {
  const _verbose = verbose;
  const Entities = new Set(); //list of entities created
  const ComponentMap = new Map(); //a map for quickly retrieve entity that have a given component (ComponentId => [entity1, entity2...])
  const EntityComponents = new Map(); // a 3D map with primary key being entity ID with a map of all components

  const _log = ( ...$msg) => {
    if(verbose) {
      console.log('Memory Store: ',...$msg)
    }
  }

  /**
   * Add an Entity to storage
   * @param {any} entityId - Any value that is unique
   * @returns {Set<any>}
   */
  const addEntity = (entityId) => {
    EntityComponents.set(entityId, new Map())
    _log(`Saving Entity ${entityId}`)
    return Entities.add(entityId)
  }

  /**
   * Remove an entity from storage
   * @param entityId
   * @returns {boolean}
   */
  const removeEntity = (entityId) => {
    _log(`Removing Entity ${entityId}`)
    return Entities.delete(entityId)
  }

  /**
   * Return EntityId or undefined if the entity does not exists
   * @param entityId
   * @returns {entityId}
   */
  const getEntity = (entityId) => {
    _log(`Get Entity ${entityId}`)
    const e = Entities.has(entityId) ? entityId : undefined;
    _log(`Found Entity ${entityId}`)
    return e
  }

  /**
   * Return a Set containing all entities
   * @returns {Set<any>}
   */
  const getEntities = () => {
    //returning a new set so users can not override the Entities Set by inadvertence
    return new Set(Entities);
  }

  /**
   * Get all components attached to an entity
   * @param {any} entityId - EntityId to retrieve components from
   * @returns {Set} - Set of components
   */
  const getEntityComponents = (entityId) => {
    _log(`Get Entity Components for ${entityId}`)
    return EntityComponents.has(entityId) ? EntityComponents.get(entityId) : new Set();
  }

  /**
   * List all entities that have the component attached
   * @param {array} components - array of components name
   * @returns {Set} - List of entities
   */
  const getEntityByComponents = (components) => {
    _log(`Get List of Entities by Components for `,components)
    const e =  components.reduce((acc, val) => {
      if(acc.size == 0){
        return ComponentMap.get(val) || new Set();
      }

      return new Set([...acc].filter(i => ComponentMap.get(val).has(i)))
    }, new Set());
    _log(`Found Entities`, e)
    return e;
  }

  /**
   * Add a component to an entity
   * @param {any} entityId - EntityId
   * @param {string} componentName - Name of Component to add to entity
   * @param {object} component - Component value for initialisation
   */
  const addEntityComponent = ( entityId, componentName, component) => {
    _log(`Add Component ${componentName} to Entity ${entityId}`)
    if(!ComponentMap.has(componentName)) {
      ComponentMap.set(componentName, new Set([entityId]));
      EntityComponents.get(entityId).set(componentName, component);
    } else {
      ComponentMap.get(componentName).add(entityId);
      EntityComponents.get(entityId).set(componentName, component);
    }
  }

  /**
   * Remove Component from an entity
   * @param {any }entityId - EntityId to remove component from
   * @param {string} componentName - Component Name
   * @returns {boolean|*}
   */
  const removeEntityComponent = (entityId, componentName) => {
    _log(`Remove Component ${componentName} to Entity ${entityId}`)
    if(!ComponentMap.has(componentName)) {
      return false;
    } else {
      return EntityComponents.get(entityId).delete(componentName) &&
        ComponentMap.get(componentName).delete(entityId);
    }
  }

  return {
    addEntity,
    removeEntity,
    getEntity,
    getEntities,
    addEntityComponent,
    removeEntityComponent,
    getEntityByComponents,
    getEntityComponents
  }
}
