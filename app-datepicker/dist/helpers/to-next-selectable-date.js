import { toUTCDate } from 'nodemod/dist/calendar/helpers/to-utc-date.js';
import { navigationKeySetDayNext, navigationKeySetDayPrevious } from '../constants.js';
import { toDayDiffInclusive } from './to-day-diff-inclusive.js';
export function toNextSelectableDate({ date, disabledDatesSet, disabledDaysSet, key, maxTime, minTime, }) {
    if (toDayDiffInclusive(minTime, maxTime) <= 1)
        return date;
    const focusedDateTime = +date;
    let isBeforeMinTime = focusedDateTime < minTime;
    let iaAfterMaxTime = focusedDateTime > maxTime;
    let isDisabledDay = isBeforeMinTime ||
        iaAfterMaxTime ||
        disabledDaysSet.has(date.getUTCDay()) ||
        disabledDatesSet.has(focusedDateTime);
    if (!isDisabledDay)
        return date;
    let newSelectableDate = isBeforeMinTime === iaAfterMaxTime ?
        date : new Date(isBeforeMinTime ? minTime - 864e5 : 864e5 + maxTime);
    let newSelectableDateTime = +newSelectableDate;
    const fy = newSelectableDate.getUTCFullYear();
    const m = newSelectableDate.getUTCMonth();
    let d = newSelectableDate.getUTCDate();
    while (isDisabledDay) {
        if (isBeforeMinTime || (!iaAfterMaxTime && navigationKeySetDayNext.has(key)))
            d += 1;
        if (iaAfterMaxTime || (!isBeforeMinTime && navigationKeySetDayPrevious.has(key)))
            d -= 1;
        newSelectableDate = toUTCDate(fy, m, d);
        newSelectableDateTime = +newSelectableDate;
        if (!isBeforeMinTime) {
            isBeforeMinTime = newSelectableDateTime < minTime;
            if (isBeforeMinTime) {
                newSelectableDate = new Date(minTime);
                d = newSelectableDate.getUTCDate();
            }
        }
        if (!iaAfterMaxTime) {
            iaAfterMaxTime = newSelectableDateTime > maxTime;
            if (iaAfterMaxTime) {
                newSelectableDate = new Date(maxTime);
                d = newSelectableDate.getUTCDate();
            }
        }
        isDisabledDay =
            disabledDaysSet.has(newSelectableDate.getUTCDay()) ||
                disabledDatesSet.has(+newSelectableDate);
    }
    return newSelectableDate;
}
