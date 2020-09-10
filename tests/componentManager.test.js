import {ComponentManager} from '../src/componentManager';

const mockStorage = {
    addEntity: jest.fn(),
    removeEntity: jest.fn(),
    getEntity: jest.fn(),
    getEntities: jest.fn(),
    addEntityComponent: jest.fn(),
    removeEntityComponent: jest.fn(),
    getEntityByComponents: jest.fn(),
    getEntityComponents: jest.fn()
}

test('Initialise Component Manager return an object of functions', () => {
    const cm = ComponentManager(mockStorage,false)
    expect(cm).toHaveProperty('add');
    expect(cm).toHaveProperty('register');
    expect(cm).toHaveProperty('remove');
})

// Registration of component test cases
describe('Register Component', () => {

    it('accepts new empty Component', () => {
        const cm = ComponentManager(mockStorage,false)
        const res = cm.register({name:'test'})
        const expectedResult = new Map();
        expectedResult.set('test',{});
        expect(res).toBe(true)
        expect(cm.isRegistered('test')).toBe(true);
        const list = cm.list();
        expect(list.size).toEqual(1);
        expect(list).toEqual(expectedResult);
    })
    it('accepts new Component with data structure', () => {
        const cm = ComponentManager(mockStorage,false)
        const component = {
            name: 'Position',
            data: {
                x: {type: 'number', default: 0},
                y: {type: 'number', default: 0},
                z: {type: 'number', default: 0}
            }
        }
        const res = cm.register(component)
        const expectedResult = new Map();
        expectedResult.set('Position',{
            x: {type: 'number', default: 0},
            y: {type: 'number', default: 0},
            z: {type: 'number', default: 0}
        });
        expect(res).toBe(true)
        const list = cm.list();
        expect(list.size).toEqual(1);
        expect(list).toEqual(expectedResult);
    })
    it('rejects a component without name', () => {
        const cm = ComponentManager(mockStorage,false)
        const component = {
            data: {
                x: {type: 'number', default: 0},
                y: {type: 'number', default: 0},
                z: {type: 'number', default: 0}
            }
        }
        const res = cm.register(component)
        expect(res).toBe(false)
        const list = cm.list();
        expect(list.size).toEqual(0);
    })

    it('recognised registered components', () => {
        const cm = ComponentManager(mockStorage,false)
        const res = cm.register({name:'test'})
        expect(cm.isRegistered('test')).toBe(true);
        expect(cm.isRegistered('test2')).toBe(false);
    })
})


//add component to entity test case
describe('Add Component to Entity', () => {
    const cm = ComponentManager(mockStorage,false)
    cm.register({name:'Empty'})
    //'types: string', 'number', 'array', 'enum', 'any'
    const component = {
        name: 'Position',
        data: {
            x: {type: 'number', default: 0},
            y: {type: 'string', default: 'test'},
            z: {type: 'enum', default: 'test', allowed:['test','hello']},
            arr: {type: 'array', default:[], childType: 'string'},
            req: {type: 'number'},
            opt: {type: 'number', optional: true},
            an: {type:'any', optional: true}
        }
    }
    cm.register(component);


    it('accepts adding new empty component',() => {
        const res = cm.add(1,'Empty')
        expect(mockStorage.addEntityComponent).toHaveBeenCalledWith(1, 'Empty', {})
        expect(res).toBe(true);
    })

    it('accepts adding new component with data',() => {
        const res = cm.add(1,'Position', {
            x:1,
            y:'hello',
            z:'hello',
            arr: ['this','is','a','test'],
            req:2,
            opt:3,
            an: {a:'ahah'}
        })
        expect(mockStorage.addEntityComponent).toHaveBeenCalledWith(1, 'Position', {
            x:1,
            y:'hello',
            z:'hello',
            arr: ['this','is','a','test'],
            req:2,
            opt:3,
            an: {a:'ahah'}
        })
        expect(res).toBe(true);
    })

    it('accepts adding new component with partial data',() => {
        const res = cm.add(1,'Position', {req:1})
        expect(mockStorage.addEntityComponent).toHaveBeenCalledWith(1, 'Position', {
            an: undefined,
            arr:[],
            opt:undefined,
            req: 1,
            x: 0,
            y:'test',
            z:'test'
        })
        expect(res).toBe(true);
    })

    it('rejects unknown component',() => {
        const res = cm.add(1,'Unknown')
        expect(res).toBe(false);
    })

    //only check one validation, the type of validation failed is checked on other test of validation lib
    it('rejects wrong data {string} for component',() => {
        const res = cm.add(1,'Position', {x:'this is a test',y:1})
        expect(res).toBe(false);
    })
    it('rejects keys that are not present in schema',() => {
        const res = cm.add(1,'Position', {idonotexists:'this is a test', req:2})
        expect(res).toBe(false);
    })

})

describe('Remove Component from Entity', () => {
    it('call storage to remove entity',() => {
        const cm = ComponentManager(mockStorage,false)
        cm.register({name:'Empty'})
        cm.add(1,'Empty')
        const res = cm.remove(1, 'Empty')
        expect(mockStorage.removeEntityComponent).toHaveBeenCalledWith(1,'Empty')
    })
})

describe('dump registered components', () => {
    it('dumps components into an object', () => {
        const cm = ComponentManager(mockStorage,false)
        cm.register({name:'Empty'})
        //'types: string', 'number', 'array', 'enum', 'any'
        const component = {
            name: 'Position',
            data: {
                x: {type: 'number', default: 0},
                y: {type: 'string', default: 'test'},
                z: {type: 'enum', default: 'test', allowed:['test','hello']},
                arr: {type: 'array', default:[], childType: 'string'},
                req: {type: 'number'},
                opt: {type: 'number', optional: true},
                an: {type:'any', optional: true}
            }
        }
        cm.register(component);
        const result = {
            components: [
                {name:'Empty'},
                component
            ]
        }
        const res =  cm.dump();
        expect(cm.dump()).toEqual(result)
    })


})