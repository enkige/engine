import {EntityManager} from '../src/entityManager';

const mockStorage = {
    _entity: new Set(),
    addEntity: jest.fn((id) => {
        mockStorage._entity.add(id);
    }),
    removeEntity: jest.fn(() => {
        return true;
    }),
    getEntity: jest.fn((id) => {
        if(mockStorage._entity.has(id)) return id;
    }),
    getEntities: jest.fn(() => {
        return mockStorage._entity
    }),
    addEntityComponent: jest.fn(),
    removeEntityComponent: jest.fn(),
    getEntityByComponents: jest.fn(),
    getEntityComponents: jest.fn(() => {return new Set()})
}

describe('Entity Manager', () => {

    it('Initialise Entity Manager return an object of functions', () => {
        const em = EntityManager(mockStorage,false);
        mockStorage._entity = new Set()
        expect(em).toHaveProperty('add');
        expect(em).toHaveProperty('get');
        expect(em).toHaveProperty('list');
        expect(em).toHaveProperty('remove');
        expect(em).toHaveProperty('dump');
    })

    it('add an entity', () => {
        const em = EntityManager(mockStorage,false);
        mockStorage._entity = new Set()
        const e = em.add();
        expect(mockStorage.addEntity).toHaveBeenCalledWith(e);

        const namedEntity = em.add('test')
        expect(mockStorage.addEntity).toHaveBeenCalledWith('test');
        expect(namedEntity).toEqual('test')
    })

    it('gets entity by id', () => {
        const em = EntityManager(mockStorage,false);
        mockStorage._entity = new Set()
        const e = em.add();
        expect(em.get(e)).toEqual({id:e, components: new Set()});
        expect(em.get(1234)).toBeUndefined()

    })

    it('lists all entities', () => {
        const em = EntityManager(mockStorage,false);
        mockStorage._entity = new Set()
        em.add('test');
        em.add('test2');
        const res = em.list();
        expect(res.next().value).toEqual('test');

    })

    it('removes entity', () => {
        const em = EntityManager(mockStorage,false);
        mockStorage._entity = new Set()
        const res =  em.remove(1);
        expect(mockStorage.removeEntity).toHaveBeenCalledWith(1);
        expect(res).toBe(true);
    })

    it('dumps entities', () => {
        const em = EntityManager(mockStorage,false);
        mockStorage._entity = new Set()
        em.add('test');
        em.add('test2');

        const expected =  {
                entities: [ { id: 'test', components: [] }, { id: 'test2', components: [] } ]
            }
        ;
        expect(em.dump()).toEqual(expected);
    })

})