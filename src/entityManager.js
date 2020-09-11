import {v4 as uuidv4} from 'uuid';

export const EntityManager = (storage) => {
    const _storage = storage;

    /**
     * Add a new entity
     * @param {string} [id] - Entity Id
     * @returns {string} - Entity Id
     */
    const add = (id) => {
        const entity = id || uuidv4();
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
        if (typeof eid == 'undefined') {
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

    const dump = () => {
        //dump entities
        const data = {
            entities: []
        };
        const entities = list();
        for (let e of entities) {
            const entity = get(e)
            const c = []
            entity['components'].forEach((data, name) => {
                if (Object.keys(data).length === 0 && data.constructor === Object) {
                    c.push({name})
                } else {
                    c.push({
                        name: name,
                        data: data
                    })
                }

            })
            const en = {
                id: e,
                components: c
            }
            data['entities'].push(en);
        }
        return data;
    };

    const load = (data) => {
        if (!data.hasOwnProperty('entities')) {
            return false
        }
        for (let e of data['entities']) {
            console.log(e)
            add(e['id'])
        }
        return true;
    }

    return {
        add,
        get,
        list,
        remove,
        dump,
        load
    };
};
