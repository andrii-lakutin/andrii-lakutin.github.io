import { getFormatter } from 'nodemod/dist/calendar/helpers/get-formatter.js';
import { DateTimeFormat } from '../constants.js';
export function toFormatters(locale) {
    const dateFmt = DateTimeFormat(locale, {
        timeZone: 'UTC',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
    const dayFmt = DateTimeFormat(locale, { timeZone: 'UTC', day: 'numeric' });
    const fullDateFmt = DateTimeFormat(locale, {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    const longMonthYearFmt = DateTimeFormat(locale, {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'long',
    });
    const longWeekdayFmt = DateTimeFormat(locale, { timeZone: 'UTC', weekday: 'long' });
    const longMonthFmt = DateTimeFormat(locale, { timeZone: 'UTC', month: 'long' });
    const narrowWeekdayFmt = DateTimeFormat(locale, { timeZone: 'UTC', weekday: 'narrow' });
    const yearFmt = DateTimeFormat(locale, { timeZone: 'UTC', year: 'numeric' });
    return {
        locale,
        dateFormat: getFormatter(dateFmt),
        dayFormat: getFormatter(dayFmt),
        fullDateFormat: getFormatter(fullDateFmt),
        longMonthFormat: getFormatter(longMonthFmt),
        longMonthYearFormat: getFormatter(longMonthYearFmt),
        longWeekdayFormat: getFormatter(longWeekdayFmt),
        narrowWeekdayFormat: getFormatter(narrowWeekdayFmt),
        yearFormat: getFormatter(yearFmt),
    };
}
