import EnkiEngine from '../src/index';

const mockStorage = (verbose) => {
    return {
        addEntity: jest.fn(),
        removeEntity: jest.fn(),
        getEntity: jest.fn(),
        getEntities: jest.fn(),
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
})

test('initialise EnkiEngine with custom storage', () => {
    const eng = EnkiEngine({storageType: 'custom', storageInstance: mockStorage});
    expect(eng.EntityManager).toBeDefined();
    expect(eng.ComponentManager).toBeDefined();
    expect(eng.SystemManager).toBeDefined();
})