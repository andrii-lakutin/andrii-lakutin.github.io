import { getWeekdays } from 'nodemod/dist/calendar/helpers/get-weekdays.js';
import { toUTCDate } from 'nodemod/dist/calendar/helpers/to-utc-date.js';
import { calendar } from 'nodemod/dist/calendar/index.js';
export function toMultiCalendars(options) {
    const { dayFormat, fullDateFormat, locale, longWeekdayFormat, narrowWeekdayFormat, currentDate, disabledDates, disabledDays, firstDayOfWeek, max, min, showWeekNumber, weekLabel, weekNumberType, count, } = options;
    const countValue = count || 0;
    const calendarCount = countValue + +!(countValue & 1);
    const minTime = min == null ? Number.MIN_SAFE_INTEGER : +min;
    const maxTime = max == null ? Number.MAX_SAFE_INTEGER : +max;
    const weekdays = getWeekdays({
        longWeekdayFormat,
        narrowWeekdayFormat,
        firstDayOfWeek,
        showWeekNumber,
        weekLabel,
    });
    const getKey = (date) => [
        locale,
        date.toJSON(),
        disabledDates?.join('_'),
        disabledDays?.join('_'),
        firstDayOfWeek,
        max?.toJSON(),
        min?.toJSON(),
        showWeekNumber,
        weekLabel,
        weekNumberType,
    ].filter(Boolean).join(':');
    const ify = currentDate.getUTCFullYear();
    const im = currentDate.getUTCMonth();
    const calendarCountInitialValue = Math.floor(calendarCount / 2) * -1;
    const calendarCountArray = Array.from(Array(calendarCount), (_, i) => calendarCountInitialValue + i);
    const calendarsList = calendarCountArray.map((n) => {
        const firstDayOfMonth = toUTCDate(ify, im + n, 1);
        const lastDayOfMonthTime = +toUTCDate(ify, im + n + 1, 0);
        const key = getKey(firstDayOfMonth);
        if (lastDayOfMonthTime < minTime || +firstDayOfMonth > maxTime) {
            return {
                key,
                calendar: [],
                disabledDatesSet: new Set(),
                disabledDaysSet: new Set(),
            };
        }
        const calendarDays = calendar({
            date: firstDayOfMonth,
            dayFormat,
            disabledDates,
            disabledDays,
            firstDayOfWeek,
            fullDateFormat,
            locale,
            max,
            min,
            showWeekNumber,
            weekNumberType,
        });
        return { ...calendarDays, key };
    });
    const calendars = [];
    const $disabledDatesSet = new Set();
    const $disabledDaysSet = new Set();
    for (const cal of calendarsList) {
        const { disabledDatesSet, disabledDaysSet, ...rest } = cal;
        if (rest.calendar.length > 0) {
            if (disabledDaysSet.size > 0) {
                for (const o of disabledDaysSet)
                    $disabledDaysSet.add(o);
            }
            if (disabledDatesSet.size > 0) {
                for (const o of disabledDatesSet)
                    $disabledDatesSet.add(o);
            }
        }
        calendars.push(rest);
    }
    return {
        calendars,
        weekdays,
        disabledDatesSet: $disabledDatesSet,
        disabledDaysSet: $disabledDaysSet,
        key: getKey(currentDate),
    };
}
