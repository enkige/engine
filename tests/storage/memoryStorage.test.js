import {MemoryStorage} from '../../src/storage/memoryStorage';

describe('Memory Storage Component', () => {

    describe('it manages entities', () => {
        const memOrig = MemoryStorage(false);
        const  state = {
            Entities: new Set(),
            ComponentMap: new Map(),
            EntityComponents: new Map()
        }
        const memExt = MemoryStorage(false, state);

        test.each([[memOrig],[memExt]])('adds entity and retrieve it',(mem) =>{
            mem.addEntity(1);
            mem.addEntity(2);
            const s = mem.addEntity(3);
            expect(s.has(1)).toBe(true);
            expect(mem.getEntity(1)).toEqual(1);
        })

        test.each([[memOrig],[memExt]])('retrieves all entities',(mem) => {
            const ae = mem.getEntities()
            expect(ae.size).toEqual(3)
            expect(ae.has(1)).toBe(true);
            expect(ae.has(2)).toBe(true);
            expect(ae.has(3)).toBe(true);

        })

        test.each([[memOrig],[memExt]])('return undefined when entity does not exists',(mem) =>{
            expect(mem.getEntity(123)).toBeUndefined();
        })

        test.each([[memOrig],[memExt]])('remove existing entity', (mem) => {
            expect(mem.removeEntity(1)).toBe(true);
            expect(mem.getEntity(1)).toBeUndefined();
        })

    })

    describe('it manages components of entities', () => {
        const mem = MemoryStorage(false);

        it('add a component to an entity', () => {

            mem.addEntity(1);
            mem.addEntityComponent(1,'test',{x:1})
            mem.addEntityComponent(1,'test2',{'somekey':'sometest'})
            const co = mem.getEntityComponents(1)
            expect(co.has('test')).toBe(true);
            expect(co.get('test')).toEqual({x:1})

            mem.addEntity(2);
            mem.addEntityComponent(2,'test',{x:2})
            const com = mem.getEntityComponents(2)
            expect(com.has('test')).toBe(true);
            expect(com.get('test')).toEqual({x:2})

            mem.addEntity(3);
            expect(mem.getEntityComponents(3)).toEqual(new Map());
        })

        it('retrieves entities by components', () => {
            const f= () => {
                mem.getEntityByComponents('test');
            }
            expect(f).toThrow('Components must be an array')
            const ens = mem.getEntityByComponents(['test']);
            expect(ens.has(1)).toBe(true)
            expect(ens.has(2)).toBe(true)

            const ens2 = mem.getEntityByComponents(['test','test2']);
            expect(ens2.has(1)).toBe(true)
            expect(ens2.has(2)).toBe(false)
        })

        it('removes component from entities', () => {
            expect(mem.removeEntityComponent(1, 'test')).toBe(true);
            expect(mem.removeEntityComponent(1, 'test3')).toBe(false);
        })

        it('does not retrieve entities with unknown components', () => {
            const ens = mem.getEntityByComponents(['test','unknown']);
            expect(ens.has(1)).toBe(false)
            expect(ens.has(2)).toBe(false)
        })

        it('removes all components when deleting an entity', () => {
            const res = mem.removeEntity(2)
            expect(res).toBe(true)
            const ens = mem.getEntityByComponents(['test']);
            expect(ens).toEqual(new Set())
        })


    })

    it('returns state', () => {
        const mem = MemoryStorage(false);
        const state = mem.getState();
        expect(state).toEqual({
            Entities: new Set(),
            ComponentMap: new Map(),
            EntityComponents: new Map()
        })
    })

    describe('it accepts external component as storage', () => {



    })


})