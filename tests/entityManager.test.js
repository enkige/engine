import {EntityManager} from '../src/entityManager';

const mockStorage = {
    addEntity: jest.fn(),
    removeEntity: jest.fn(() => {
        return true;
    }),
    getEntity: jest.fn(),
    getEntities: jest.fn(() => {
        const e = new Set();
        e.add('test')
        e.add('test2')
        return e;
    }),
    addEntityComponent: jest.fn(),
    removeEntityComponent: jest.fn(),
    getEntityByComponents: jest.fn(),
    getEntityComponents: jest.fn()
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

    })

    it('gets entity by id', () => {
        const em = EntityManager(mockStorage,false);
        const e = em.add();
        const res = em.get(e);
        expect(res).toEqual(e);
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