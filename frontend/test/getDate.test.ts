import { getDate } from '@todo/helpers/getDate';

describe('getDate function', () => {
  test('should format date correctly', () => {
    const mockDate = new Date('2024-01-01T12:00:00');
    const expectedFormattedDate = 'January 1, 2024';
    const result = getDate(mockDate);
    expect(result).toBe(expectedFormattedDate);
  });

  test('should return empty string for invalid date', () => {
    const mockDate = new Date('invalid date');
    const result = getDate(mockDate);
    expect(result).toBe('Invalid Date');
  });
});
