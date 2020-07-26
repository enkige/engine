import {isString, isArrayOf, isNumber, isEnum, isAny} from './validate';

test('`test` is a anything but undefined', () => {
  expect(isAny('test')).toBe(true);
});

test('`undefined` is not anything but undefined', () => {
  expect(isAny(undefined)).toBe(false);
});

//testing isString
test('`test` is a string', () => {
  expect(isString('test')).toBe(true);
});
test('`1` is not a string', () => {
  expect(isString(1)).toBe(false);
});
test('`[1,2,3]` is not a string', () => {
  expect(isString([1, 2, 3])).toBe(false);
});

//Testing isNUmber
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

//testing enum
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

//testing array
test('`[]` is an array of every type', () => {
  expect(isArrayOf([],'string')).toBe(true);
  expect(isArrayOf([],'number')).toBe(true);
  expect(isArrayOf([],'mixed')).toBe(true);

});
test('`[1,"test"]` is a mixed array', () => {
  expect(isArrayOf([1, 'test'], 'mixed')).toBe(true);
});
test('`[1,2.234,3]` is an array of number', () => {
  expect(isArrayOf([1,2.234,3], 'number')).toBe(true);
});
test('`["test","someother"]` is an array of string', () => {
  expect(isArrayOf(['test','someother'], 'string')).toBe(true);
});
test('`test` and `1` are not an array', () => {
  expect(isArrayOf('test', 'string')).toBe(false);
  expect(isArrayOf(1, 'string')).toBe(false);
});
test('`["test", 1]` is not an array of string', () => {
  expect(isArrayOf(['test', 1], 'string')).toBe(false);
});
test('`["test", 1]` is not an array of number', () => {
  expect(isArrayOf(['test', 1], 'number')).toBe(false);
});
test('`object` is not a supported type for array', () => {
  expect(() => isArrayOf(['test', 1], 'object')).toThrow(TypeError);
});