import { toUTCDate } from 'nodemod/dist/calendar/helpers/to-utc-date.js';
import { navigationKeySetDayNext, navigationKeySetDayPrevious } from '../constants.js';
import { keyArrowDown, keyArrowLeft, keyArrowRight, keyArrowUp, keyEnd, keyHome, keyPageDown, keyPageUp } from '../key-values.js';
import { toNextSelectableDate } from './to-next-selectable-date.js';
export function toNextSelectedDate({ currentDate, date, disabledDatesSet, disabledDaysSet, hasAltKey, key, maxTime, minTime, }) {
    const dateFullYear = date.getUTCFullYear();
    const dateMonth = date.getUTCMonth();
    const dateDate = date.getUTCDate();
    const dateTime = +date;
    const currentDateFullYear = currentDate.getUTCFullYear();
    const currentDateMonth = currentDate.getUTCMonth();
    const notInCurrentMonth = currentDateMonth !== dateMonth || currentDateFullYear !== dateFullYear;
    let fy = dateFullYear;
    let m = dateMonth;
    let d = dateDate;
    let shouldRunSwitch = true;
    if (notInCurrentMonth) {
        fy = currentDateFullYear;
        m = currentDateMonth;
        d = 1;
        shouldRunSwitch =
            key === keyPageDown ||
                key === keyPageUp ||
                key === keyEnd;
    }
    switch (shouldRunSwitch) {
        case dateTime === minTime && navigationKeySetDayPrevious.has(key):
        case dateTime === maxTime && navigationKeySetDayNext.has(key):
            break;
        case key === keyArrowUp: {
            d -= 7;
            break;
        }
        case key === keyArrowDown: {
            d += 7;
            break;
        }
        case key === keyArrowLeft: {
            d -= 1;
            break;
        }
        case key === keyArrowRight: {
            d += 1;
            break;
        }
        case key === keyPageDown: {
            hasAltKey ? fy += 1 : m += 1;
            break;
        }
        case key === keyPageUp: {
            hasAltKey ? fy -= 1 : m -= 1;
            break;
        }
        case key === keyEnd: {
            m += 1;
            d = 0;
            break;
        }
        case key === keyHome: {
            d = 1;
            break;
        }
        default:
    }
    if (key === keyPageDown || key === keyPageUp) {
        const totalDaysOfMonth = toUTCDate(fy, m + 1, 0).getUTCDate();
        if (d > totalDaysOfMonth) {
            d = totalDaysOfMonth;
        }
    }
    const nextSelectableDate = toNextSelectableDate({
        date: toUTCDate(fy, m, d),
        disabledDatesSet,
        disabledDaysSet,
        key,
        maxTime,
        minTime,
    });
    return nextSelectableDate;
}
