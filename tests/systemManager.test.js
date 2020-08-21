import {SystemManager} from '../src/systemManager';

const mockStorage = {
    addEntity: jest.fn(),
    removeEntity: jest.fn(),
    getEntity: jest.fn(),
    getEntities: jest.fn(),
    addEntityComponent: jest.fn(),
    removeEntityComponent: jest.fn(),
    getEntityByComponents: jest.fn(() => {
        const e = new Set();
        e.add('1234567890')
        return e;
    }),
    getEntityComponents: jest.fn(() => {
        return new Set()
    })
}


test('Initialise System Manager return an object of functions', () => {
    const sm = SystemManager(mockStorage, false)
    expect(sm).toHaveProperty('execute');
    expect(sm).toHaveProperty('register');
})

describe('Register System', () => {
    let consoleOutput = []
    const mockedLog = (...output) => consoleOutput.push(output)
    beforeEach(() => (console.log = mockedLog))
    const originalLog = console.log
    afterEach(() => (console.log = originalLog))

    it('register a correct system', () => {
        const sm = SystemManager(mockStorage, true)
        const mySystem = (c, l) => {
            return {
                execute: function(){},
                events: function(){}
            }
        }
        mySystem.query = ['test']
        mySystem.events = ['someEvents']
        const res = sm.register(mySystem);
        expect(res).toBe(true);
        expect(consoleOutput).toEqual([[
            'System Manager: ',
            "Registering mySystem System"
        ]])
    })

    it('does not register non valid system', () => {
        const sm = SystemManager(mockStorage, false)
        let s = (c, l) => {
        }
        let res = sm.register(s);
        expect(res).toBe(false);

        s = () => {
            return {
                execute: function(){},
                events: function(){}
            }
        }
        res = sm.register(s);
        expect(res).toBe(false);

        s = () => {
            return {
                execute: function(){},
                events: function(){}
            }
        }
        s.query =[123,123]
        s.events = ['test']
        res = sm.register(s);
        expect(res).toBe(false);

        s = () => {
            return {
                execute: function(){},
                events: function(){}
            }
        }
        s.query = ['test']
        s.events = [123,123]
        res = sm.register(s);
        expect(res).toBe(false);

        s = () => {
            return {
                events: function(){}
            }
        }
        s.query = ['test']
        s.events = ['test']
        res = sm.register(s);
        expect(res).toBe(false);

        s = () => {
            return {
                execute: function(){}
            }
        }
        s.query = ['test']
        s.events = ['test']
        res = sm.register(s);
        expect(res).toBe(false);

    })

})

describe('Execute Systems', () => {


    it('execute systems', () => {
        const sm = SystemManager(mockStorage, false)
        const execute = jest.fn(() => {
            return true
        })
        const events = jest.fn()
        const s = jest.fn(() => {
            return {
                execute,
                events
            }
        })
        s.query = ['test']
        s.events = []
        const res = sm.register(s);
        const execResult = sm.execute()
        expect(mockStorage.getEntityByComponents).toHaveBeenCalledWith(s.query)
        expect(mockStorage.getEntityComponents).toHaveBeenCalledWith('1234567890')
        expect(s).toHaveBeenCalled()
        expect(execute).toHaveBeenCalledWith(new Set())
        expect(execResult.get('mockConstructor').get('1234567890')).toBe(true)
    });

    it('trigger events', () => {
        const sm = SystemManager(mockStorage, false)
        const execute = jest.fn(() => {
            return true
        })
        const events = jest.fn(() => {
            return true
        })
        const s = jest.fn(() => {
            return {
                execute,
                events
            }
        })
        s.query = ['test']
        s.events = ['click']
        const res = sm.register(s);
        sm.registerEvent('click')
        const execResult = sm.triggerEvent('click', {})
        expect(mockStorage.getEntityByComponents).toHaveBeenCalledWith(s.query)
        expect(mockStorage.getEntityComponents).toHaveBeenCalledWith('1234567890')
        expect(s).toHaveBeenCalledWith()
        expect(events).toHaveBeenCalledWith(new Set(),'click', {})
        expect(execResult.get('mockConstructor').get('1234567890')).toBe(true)
    })

    it('decline non registered events', () => {
        const sm = SystemManager(mockStorage, false)
        const s = jest.fn(() => {
            const execute = () => true
            const events = () => true
            return {
                execute,
                events
            }
        })
        s.query = ['test']
        s.events = []
        const res = sm.register(s);

        const wrongResult = sm.triggerEvent('unknown')
        expect(mockStorage.getEntityByComponents).not.toHaveBeenCalled()
        expect(s).not.toHaveBeenCalledWith(new Set())
        expect(wrongResult).toBe(false)
    })

    it('only accept string as eventName', () => {
        const sm = SystemManager(mockStorage, false)
        const res = sm.registerEvent(1234)
        expect(res).toBe(false)
    })

})