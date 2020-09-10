import {TemplateManager} from '../src/templateManager'
import {isArray} from "../src/utils/validate";
import {ValidationError} from "../src/utils/errors";

const mockComponentMgr = {
    add: jest.fn((id, name, data) => {
        if(name == 'error') {
            throw new Error('My mock error');
        }
    }),
    register: jest.fn(),
    isRegistered: jest.fn((name) => {
        if (name == 'unregistered') {
            return false
        }
        return true;
    })
}

const mockEntityMgr = {
    add: jest.fn(() => { return 'id' }),
    remove: jest.fn()
}

describe('Template Manager', () => {


    it('register templates', () => {
        const templateMgr = TemplateManager(mockEntityMgr, mockComponentMgr)
        let components = [
            {
                name: 'test',
                data: {
                    test: {type: 'string'}
                }
            },
            {
                name: 'test2'
            }
        ]
        const defaultValues = new Map()
        defaultValues.set('test', 'this is my value');

        expect(templateMgr.register('myTemplate', components)).toBe(true);
        expect(templateMgr.register('myTemplate2', components, defaultValues)).toBe(true);
        //fails
        expect(() => templateMgr.register(1234)).toThrow(new ValidationError('Invalid name for template'));
        expect(() => templateMgr.register('myTemplate')).toThrow(new ValidationError('A template with this name already exists.'));
        expect(() => templateMgr.register('test2', [])).toThrow(new ValidationError('Invalid components list'));
        expect(() => templateMgr.register('test3', components, [])).toThrow(new ValidationError('defaultValues must be a Map.'));

        components = [
            {
                name: 'unregistered',
                data: {
                    test: {type: 'string'}
                }
            },
            {
                name: 'test2'
            }
        ]
        //disable auto registration of components
        expect(() => templateMgr.register('test4', components, null, false)).toThrow(new ValidationError('Component unregistered is not registered.'));
        //enable autoregistration of components
        expect(templateMgr.register('test4', components)).toBe(true);


    })

    it('removes existing templates', () => {
        const templateMgr = TemplateManager(mockEntityMgr, mockComponentMgr)
        let components = [
            {
                name: 'flag'
            }
        ]

        templateMgr.register('myTemplate', components);

        const map = new Map()
        map.set('myTemplate', {
            name: 'myTemplate',
            components: components,
            defaultValues: new Map()
        })

        expect(templateMgr.list()).toEqual(map);
        templateMgr.remove('myTemplate')
        expect(templateMgr.list()).toEqual(new Map());

        expect(() => {
            templateMgr.remove('unknown')
        }).toThrow(new ValidationError('Template does not exist'));
    })

    it('creates entity from template', () => {
        const templateMgr = TemplateManager(mockEntityMgr, mockComponentMgr)
        let components = [
            {
                name: 'test',
                data: {
                    test: {type: 'string'}
                }
            },
            {
                name: 'test2'
            }
        ]
        const defaultValues = new Map()
        defaultValues.set('test', 'this is my value');

        templateMgr.register('myTemplate', components);
        templateMgr.register('myTemplate2', components, defaultValues);

        const cmpValues = new Map()
        cmpValues.set('test', {test:'my data'})

        expect(templateMgr.create('myTemplate', cmpValues)).toEqual('id')
        expect(templateMgr.create('myTemplate2', cmpValues)).toEqual('id')
        expect(templateMgr.create('myTemplate2')).toEqual('id')

        components = [
            {
                name: 'error'
            }
        ]
        templateMgr.register('errorTemplate', components);
        expect(() => {templateMgr.create('errorTemplate')}).toThrow(new Error('TemplateManager: Failed to add error component to entity during creation.'))

        expect(() => {templateMgr.create('unknown')}).toThrow(new Error('Template does not exist'))

    })

    it('dumps and load templates', () => {
        const templateMgr = TemplateManager(mockEntityMgr, mockComponentMgr)
        let components = [
            {
                name: 'test',
                data: {
                    test: {type: 'string'}
                }
            },
            {
                name: 'test2'
            }
        ]
        const defaultValues = new Map()
        defaultValues.set('test', 'this is my value');

        templateMgr.register('myTemplate', components, defaultValues);

        const expectedDmp =   {
            templates: [
                {
                    name: 'myTemplate',
                    components: components,
                    defaultValues: {
                        'test': 'this is my value'
                    }
                }
            ]
        }
        const dmp = templateMgr.dump()
        expect(dmp).toEqual(expectedDmp)
        const templateMgr2 = TemplateManager(mockEntityMgr, mockComponentMgr)
        expect(templateMgr2.load(dmp)).toBe(true);
        expect(templateMgr2.dump()).toEqual(expectedDmp);
        expect(templateMgr2.load({})).toBe(false);
        const wrongLoad = { templates: [{}]}
        expect(() => templateMgr2.load(wrongLoad)).toThrow(new Error('Not able to load templates because of malformed data.'));


    })

})