import { describe, expect, test } from "bun:test";
import { formatDateTime } from './index';


describe('formatDateTime', () => {
    test('should format a date string to the default format and timezone', () => {
        const input = '2024-09-01T12:00:00';
        const result = formatDateTime(input);
        expect(result).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/); // YYYY-MM-DD HH:mm:ss
    });

    test('should format a Date object to the default format and timezone', () => {
        const input = new Date('2024-09-01T12:00:00');
        const result = formatDateTime(input);
        expect(result).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/); // YYYY-MM-DD HH:mm:ss
    });

    test('should format a date string with a custom format', () => {
        const input = '2024-09-01T12:00:00';
        const result = formatDateTime(input, { format: 'DD/MM/YYYY' });
        expect(result).toBe('01/09/2024');
    });

    test('should format a Date object with a custom format and timezone', () => {
        const input = new Date('2024-09-01T12:00:00');
        const result = formatDateTime(input, { format: 'DD-MM-YYYY HH:mm', timezone: 'America/New_York' });
        expect(result).toMatch(/\d{2}-\d{2}-\d{4} \d{2}:\d{2}/); // DD-MM-YYYY HH:mm
    });

    test('should fallback to default format and timezone if options are not provided', () => {
        const input = new Date('2024-09-01T12:00:00');
        const result = formatDateTime(input);
        expect(result).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/); // YYYY-MM-DD HH:mm:ss
    });
});