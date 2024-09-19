 # @omts/date-utils 🚀

A lightweight and efficient utility library for formatting dates and times with optional time zone support in TypeScript. This package simplifies working with date and time formats, allowing customizable formats and automatic time zone detection.

## Installation 📦

Install the package via npm or pnpm:

```bash
npm install @omts/date-utils
```

or

```bash
pnpm add @omts/date-utils
```

## Usage ✨

This package provides a `formatDateTime` function that allows you to format date strings or `Date` objects into customizable formats with support for time zones.

### Example

```typescript
import { formatDateTime } from '@omts/date-utils';

// Format a date string with the default format
const result = formatDateTime('2024-09-01T12:00:00');
console.log(result); // Output: "2024-09-01 12:00:00"

// Format a Date object with a custom format and time zone
const customResult = formatDateTime(new Date(), { format: 'DD/MM/YYYY', timezone: 'America/New_York' });
console.log(customResult); // Output: "01/09/2024" (in New York timezone)
```

### Options

- **`formatDateTime(input: string | Date, options?: FormatOptions): string`**
  - `input`: The date string or `Date` object to format.
  - `options`: Optional object with formatting options:
    - `format`: The format string (default: `'YYYY-MM-DD HH:mm:ss'`).
    - `timezone`: The time zone (default: user's local time zone).
  - **Returns**: A formatted date string.

### API Documentation 📚

- **`formatDateTime(input, options)`**: Formats a date string or `Date` object to the specified format and time zone.
  - `input`: The date or time string to format.
  - `options`: Optional formatting options, including:
    - `format`: The date format string (default: `'YYYY-MM-DD HH:mm:ss'`).
    - `timezone`: The time zone (default: auto-detected local time zone).
  - **Returns**: The formatted date string.

### Key Features ✨

- **Customizable Format**: Easily format dates and times using customizable format strings.
- **Timezone Support**: Automatically detect or specify time zones when formatting dates.
- **Type Safety**: Designed with TypeScript for strong type safety and reliability.

## Development 🛠️

### Install dependencies:

```bash
pnpm install
```

### Run tests:

```bash
pnpm run test
```

### Build the project:

```bash
pnpm run build
```

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

 