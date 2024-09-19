import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// active plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export interface FormatOptions {
    format?: string;
    timezone?: string;
}

/**
 * Formats a given date or time string into a specified format, with optional timezone support.
 * @param input - The date object or string to format.
 * @param options - Optional formatting options including format string and timezone.
 * @returns The formatted date string.
 */
export const formatDateTime = (
    input: string | Date,
    options: FormatOptions = { format: 'YYYY-MM-DD HH:mm:ss', timezone: dayjs.tz.guess() }
): string => {
    const { format = 'YYYY-MM-DD HH:mm:ss', timezone = dayjs.tz.guess() } = options;

    return dayjs(input).tz(timezone).format(format);
};
