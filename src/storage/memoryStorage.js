/**
 *
 * @param {boolean} verbose - If True will send log to console
 * @param {{Entities: {Set}, ComponentMap:{Map}, EntityComponents: {Map} }} state - Object containing 3 property that must react like Map or Set. Will be used to store the state
 * @returns {{addEntity: (function(*): Set<any>), removeEntityComponent: removeEntityComponent, getEntityComponents: (function(*): any), getEntities: (function(): Set<*>), addEntityComponent: addEntityComponent, getEntity: (function(*=): *), removeEntity: (function(*=): boolean), getEntityByComponents: (function(Array): *)}}
 * @constructor
 */
export const MemoryStorage = (verbose, state = {}) => {
    const _verbose = verbose;
    const Entities = state.Entities || new Set(); //list of entities created
    const ComponentMap = state.ComponentMap || new Map(); //a map for quickly retrieve entity that have a given component (ComponentId => [entity1, entity2...])
    const EntityComponents = state.EntityComponents || new Map(); // a 3D map with primary key being entity ID with a map of all components

    const _log = (...$msg) => {
        if (verbose) {
            console.log('Memory Store: ', ...$msg)
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
     * This delete all its components as well
     * @param entityId
     * @returns {boolean}
     */
    const removeEntity = (entityId) => {
        _log(`Removing Entity ${entityId}`)
        const componentsName = EntityComponents.get(entityId)
        componentsName.forEach((v,k) => {
            ComponentMap.get(k).delete(entityId)
        })
        EntityComponents.delete(entityId)
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
        _log(`Get List of Entities by Components for `, components)
        if (!Array.isArray(components)) {
            throw Error('Components must be an array');
        }
        const e = components.reduce((acc, val) => {
            if (acc.size == 0) {
                return ComponentMap.get(val) || new Set();
            }

            return new Set([...acc].filter(i => {
                const c = ComponentMap.get(val)
                if(typeof c === 'undefined') {
                    return false
                }
                return c.has(i)
            }))
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
    const addEntityComponent = (entityId, componentName, component) => {
        _log(`Add Component ${componentName} to Entity ${entityId}`)
        if (!ComponentMap.has(componentName)) {
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
     * @returns {boolean} - True if successfull
     */
    const removeEntityComponent = (entityId, componentName) => {
        _log(`Remove Component ${componentName} to Entity ${entityId}`)
        if (!ComponentMap.has(componentName)) {
            return false;
        } else {
            return EntityComponents.get(entityId).delete(componentName) &&
                ComponentMap.get(componentName).delete(entityId);
        }
    }

    /**
     * Return an object containing the current state
     * @returns {{ComponentMap: Map<any, any>, EntityComponents: Map<any, any>, Entities: Set<any>}}
     */
    const getState = () => {
        return {
            Entities,
            ComponentMap,
            EntityComponents
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
        getEntityComponents,
        getState
    }
}
