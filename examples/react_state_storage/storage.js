export const ReactStateStorageFactory = (baseStorage) => {
    return function ReactStorage(verbose) {
        const _verbose = verbose;

        const Entities = new Set(); //list of entities created
        const ComponentMap = new Map(); //a map for quickly retrieve entity that have a given component (ComponentId => [entity1, entity2...])
        const EntityComponents = new Map(); // a 3D map with primary key being entity ID with a map of all components

        const _base = baseStorage(verbose, {Entities, ComponentMap, EntityComponents})

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
            addEntity: _base.addEntity,
            removeEntity: _base.removeEntity,
            getEntity: _base.getEntity,
            getEntities: _base.getEntities,
            addEntityComponent: _base.addEntityComponent,
            removeEntityComponent: _base.removeEntityComponent,
            getEntityByComponents: _base.getEntityByComponents,
            getEntityComponents: _base.getEntityComponents,
            getState: getState
        }
    }
}