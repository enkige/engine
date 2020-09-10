import {EntityManager} from '../src/entityManager';

const mockStorage = {
    _entity: null,
    addEntity: jest.fn((id) => {
        mockStorage._entity = id;
    }),
    removeEntity: jest.fn(() => {
        return true;
    }),
    getEntity: jest.fn(() => {
        return mockStorage._entity;
    }),
    getEntities: jest.fn(() => {
        const e = new Set();
        e.add('test')
        e.add('test2')
        return e;
    }),
    addEntityComponent: jest.fn(),
    removeEntityComponent: jest.fn(),
    getEntityByComponents: jest.fn(),
    getEntityComponents: jest.fn(() => {return new Set()})
}

describe('Entity Manager', () => {

    it('Initialise Entity Manager return an object of functions', () => {
        const em = EntityManager(mockStorage,false);
        expect(em).toHaveProperty('add');
        expect(em).toHaveProperty('get');
        expect(em).toHaveProperty('list');
        expect(em).toHaveProperty('remove');
    })

    it('add an entity', () => {
        const em = EntityManager(mockStorage,false);
        const e = em.add();
        expect(mockStorage.addEntity).toHaveBeenCalledWith(e);

        const namedEntity = em.add('test')
        expect(mockStorage.addEntity).toHaveBeenCalledWith('test');
        expect(namedEntity).toEqual('test')
    })

    it('gets entity by id', () => {
        const em = EntityManager(mockStorage,false);
        const e = em.add();
        const res = em.get(e);
        expect(res).toEqual({id:e, components: new Set()});
    })

    it('lists all entities', () => {
        const em = EntityManager(mockStorage,false);
        const res = em.list();
        expect(res.next().value).toEqual('test');

    })

    it('removes entity', () => {
        const em = EntityManager(mockStorage,false);
        const res =  em.remove(1);
        expect(mockStorage.removeEntity).toHaveBeenCalledWith(1);
        expect(res).toBe(true);
    })

})