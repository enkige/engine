import EnkiEngine from '../src/index';

const mockStorage = (verbose) => {
    return {
        addEntity: jest.fn(),
        removeEntity: jest.fn(),
        getEntity: jest.fn(),
        getEntities: jest.fn(() => {
            return new Set()
        }),
        addEntityComponent: jest.fn(),
        removeEntityComponent: jest.fn(),
        getEntityByComponents: jest.fn(),
        getEntityComponents: jest.fn()
    }
};

test('initialise EnkiEngine with default storage', () => {
    const eng = EnkiEngine({mode: 'debug'});
    expect(eng.EntityManager).toBeDefined();
    expect(eng.ComponentManager).toBeDefined();
    expect(eng.SystemManager).toBeDefined();
    expect(eng.Storage).toBeDefined();
    expect(eng.TemplateManager).toBeDefined();
    expect(eng.dump).toBeDefined();
    expect(eng.load).toBeDefined();
})

test('initialise EnkiEngine with custom storage', () => {
    const eng = EnkiEngine({storageType: 'custom', storageInstance: mockStorage});
    expect(eng.EntityManager).toBeDefined();
    expect(eng.ComponentManager).toBeDefined();
    expect(eng.SystemManager).toBeDefined();
    expect(eng.Storage).toBeDefined();
    expect(eng.TemplateManager).toBeDefined();

})

test('dump and load state', () => {
    const eng = EnkiEngine({storageType: 'custom', storageInstance: mockStorage});
    const dump = eng.dump()
    expect(dump).toEqual( { templates: [], entities: [], components: [] })
    expect(eng.load(dump)).toBe(true)
})