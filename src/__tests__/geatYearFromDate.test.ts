import { getYearFromDate } from '@/utils/date/getYearFromDate';

describe('getYearFromDate', () => {
  test('should return year from date', () => {
    const date = '2020-01-01';
    expect(getYearFromDate(date)).toEqual(2020);
  });
});
