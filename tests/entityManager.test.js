import {EntityManager} from '../src/entityManager';

let _entity = new Set();
const mockStorage = {

    addEntity: jest.fn((id) => {
        console.log('added entity '+id)
        _entity.add(id);
    }),
    removeEntity: jest.fn(() => {
        return true;
    }),
    getEntity: jest.fn((id) => {
        if(_entity.has(id)) return id;
    }),
    getEntities: jest.fn(() => {
        return new Set(_entity);
    }),
    addEntityComponent: jest.fn(),
    removeEntityComponent: jest.fn(),
    getEntityByComponents: jest.fn(),
    getEntityComponents: jest.fn((id) => {
        if(id == 'test') {
            const c = new Map()
            c.set('test',{test:'this is a test'})
            c.set('flag',{})
            return c;
        } else {
            return new Map()
        }

    })
}

describe('Entity Manager', () => {

    it('Initialise Entity Manager return an object of functions', () => {
        const em = EntityManager(mockStorage,false);
        _entity = new Set()
        expect(em).toHaveProperty('add');
        expect(em).toHaveProperty('get');
        expect(em).toHaveProperty('list');
        expect(em).toHaveProperty('remove');
        expect(em).toHaveProperty('dump');
    })

    it('add an entity', () => {
        const em = EntityManager(mockStorage,false);
        _entity = new Set()
        const e = em.add();
        expect(mockStorage.addEntity).toHaveBeenCalledWith(e);

        const namedEntity = em.add('test')
        expect(mockStorage.addEntity).toHaveBeenCalledWith('test');
        expect(namedEntity).toEqual('test')
    })

    it('gets entity by id', () => {
        const em = EntityManager(mockStorage,false);
        _entity = new Set()
        const e = em.add();
        expect(em.get(e)).toEqual({id:e, components: new Map()});
        expect(em.get(1234)).toBeUndefined()

    })

    it('lists all entities', () => {
        const em = EntityManager(mockStorage,false);
        _entity = new Set()
        em.add('test');
        em.add('test2');
        const res = em.list();
        expect(res.next().value).toEqual('test');

    })

    it('removes entity', () => {
        const em = EntityManager(mockStorage,false);
        _entity = new Set()
        const res =  em.remove(1);
        expect(mockStorage.removeEntity).toHaveBeenCalledWith(1);
        expect(res).toBe(true);
    })

    it('dumps and loads entities', () => {
        const em = EntityManager(mockStorage,false);
        _entity = new Set()
        em.add('test');
        em.add('test2');

        const expected =  {
                entities: [ { id: 'test', components: [{name:'test',data:{test:'this is a test'}},{name:'flag'}] }, { id: 'test2', components: [] } ]
            }
        ;
        const dump = em.dump();
        expect(dump).toEqual(expected);
        const em2 = EntityManager(mockStorage,false);
        _entity = new Set()
        expect(em2.load(1234)).toBe(false);
        expect(em2.load(dump)).toBe(true);
        const list = em2.list()
        expect(list.next().value).toEqual('test')
        expect(list.next().value).toEqual('test2')
    })

})