import { getTime } from '@todo/helpers/getTime';

describe('getTime function', () => {
  test('should format time correctly for AM', () => {
    const mockDate = new Date('2024-04-12T09:30:45');
    const expectedFormattedTime = '9:30:45 AM';
    const result = getTime(mockDate);
    expect(result).toBe(expectedFormattedTime);
  });

  test('should format time correctly for PM', () => {
    const mockDate = new Date('2024-04-12T21:15:30');
    const expectedFormattedTime = '9:15:30 PM';
    const result = getTime(mockDate);
    expect(result).toBe(expectedFormattedTime);
  });

  test('should return empty string for invalid date', () => {
    const mockDate = new Date('invalid date');
    const result = getTime(mockDate);
    expect(result).toBe('Invalid Date');
  });
});
