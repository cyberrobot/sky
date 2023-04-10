import { uniqObjByKey } from '../utils/data/uniq';

describe('uniq', () => {
  test('should remove duplicates by id', () => {
    const arr: any = [
      { id: 1, name: 'Al Pacino' },
      { id: 2, name: 'Robert De Niro' },
      { id: 1, name: 'Al Pacino' },
      { id: 3, name: 'Robert De Niro' },
      { id: 1, name: 'Al Pacino' },
      { id: 4, name: 'Robert De Niro' },
    ];
    const expected = [
      { id: 1, name: 'Al Pacino' },
      { id: 2, name: 'Robert De Niro' },
      { id: 3, name: 'Robert De Niro' },
      { id: 4, name: 'Robert De Niro' },
    ];
    expect(uniqObjByKey(arr, 'id')).toEqual(expected);
  });

  test('should remove duplicates by name', () => {
    const arr: any = [
      { id: 1, name: 'Al Pacino' },
      { id: 2, name: 'Robert De Niro' },
      { id: 3, name: 'Al Pacino' },
      { id: 4, name: 'Robert De Niro' },
      { id: 5, name: 'Al Pacino' },
      { id: 6, name: 'Robert De Niro' },
    ];
    const expected = [
      { id: 1, name: 'Al Pacino' },
      { id: 2, name: 'Robert De Niro' },
    ];
    expect(uniqObjByKey(arr, 'name')).toEqual(expected);
  });
});
