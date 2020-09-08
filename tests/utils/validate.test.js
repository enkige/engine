import {isString, isArray, isNumber, isEnum, isAny, isComponent, isMap, isSet} from '../../src/utils/validate';
import {ValidationError} from '../../src/utils/errors';

// testing isAny
describe('isAny', () => {
  test('`test` is a anything but undefined', () => {
    expect(isAny('test')).toBe(true);
  });

  test('`undefined` is not anything but undefined', () => {
    expect(isAny(undefined)).toBe(false);
  });
})


//testing isString
describe('isString', () => {
  test('`test` is a string', () => {
    expect(isString('test')).toBe(true);
  });
  test('`1` is not a string', () => {
    expect(isString(1)).toBe(false);
  });
  test('`[1,2,3]` is not a string', () => {
    expect(isString([1, 2, 3])).toBe(false);
  });
})


//Testing isNumber
describe('isNumber', () => {
  test('`1` is a number', () => {
    expect(isNumber(1)).toBe(true);
  });
  test('`1.1234` is a number', () => {
    expect(isNumber(1.1234)).toBe(true);
  });
  test('`test` is not a number', () => {
    expect(isNumber('test')).toBe(false);
  });
  test('`[1,2,3]` is not a number', () => {
    expect(isNumber([1, 2, 3])).toBe(false);
  });
})


//testing enum
describe('isEnum', () => {
  test('values are in enum', () => {
    const validValues = [1, 'test', 23, 'someother'];
    expect(isEnum(1, validValues)).toBe(true);
    expect(isEnum('test', validValues)).toBe(true);
  });
  test('values are not in enum', () => {
    const validValues = [1, 'test', 23, 'someother'];
    expect(isEnum(2, validValues)).toBe(false);
    expect(isEnum('hello ?', validValues)).toBe(false);
  });
  test('Array is not valid for enum', () => {
    const validValues = [1, 'test', 23, 'someother'];
    expect(isEnum([1, 2, 3], validValues)).toBe(false);
  });
  test('Object is not valid for enum', () => {
    const validValues = [1, 'test', 23, 'someother'];
    expect(isEnum({}, validValues)).toBe(false);
  });
})


//testing array
describe('isArray', () => {
  test('`[]` is an array of every type', () => {
    expect(isArray([])).toBe(true);
    expect(isArray([],'string')).toBe(true);
    expect(isArray([],'number')).toBe(true);
    expect(isArray([],'mixed')).toBe(true);

  });
  test('`[1,"test"]` is a mixed array', () => {
    expect(isArray([1, 'test'], 'mixed')).toBe(true);
  });
  test('`[1,2.234,3]` is an array of number', () => {
    expect(isArray([1,2.234,3], 'number')).toBe(true);
  });
  test('`["test","someother"]` is an array of string', () => {
    expect(isArray(['test','someother'], 'string')).toBe(true);
  });
  test('`["test","{}}"]` is an array of any', () => {
    expect(isArray(['test',{}], 'any')).toBe(true);
  });
  test('`test` and `1` are not an array', () => {
    expect(isArray('test', 'string')).toBe(false);
    expect(isArray(1, 'string')).toBe(false);
  });
  test('`["test", 1]` is not an array of string', () => {
    expect(isArray(['test', 1], 'string')).toBe(false);
  });
  test('`["test", 1]` is not an array of number', () => {
    expect(isArray(['test', 1], 'number')).toBe(false);
  });
  test('`object` is not a supported type for array', () => {
    expect(() => isArray(['test', 1], 'object')).toThrow(ValidationError);
  });
})

describe('isComponent', () => {
  it('aceptes flag component', () => {
    expect(isComponent({name:'test'})).toBe(true);
  })

  it('accepts component with data', () => {
    const component = {
      name: 'test',
      data: {
        test: {type:'number'}
      }
    }
    expect(isComponent(component)).toBe(true);
  })

  it('rejects invalid components', () => {
    const component = {
      name: 'test',
      data: 'test'
    }
    expect(isComponent({})).toBe(false);
    expect(isComponent(component)).toBe(false);
  })

  it('rejects invalid type of data', () => {
    let component = {
      name: 'test',
      data: {
        test: {type:'unkonwn'}
      }
    }
    expect(isComponent(component)).toBe(false);
    component = {
      name: 'test',
      data: 1234
    }
    expect(isComponent(component)).toBe(false);

  })
})

describe('isMap', () => {
  it('accepts Map', () => {
    expect(isMap(new Map())).toBe(true)
    const m = new Map()
    m.set('someKey','some value')
    expect(isMap(m)).toBe(true)
    expect(isMap(m, 'string')).toBe(true)
  })

  it('rejects non Map', () => {
    expect(isMap(1234)).toBe(false);
  })
})

describe('isSet', () => {
  it('accepts Map', () => {
    expect(isSet(new Set())).toBe(true)
    const s = new Set()
    s.add('somevalue')
    expect(isSet(s)).toBe(true)
    expect(isSet(s,'string')).toBe(true)
  })


  it('rejects non Set', () => {
    expect(isSet(1234)).toBe(false);
  })
})