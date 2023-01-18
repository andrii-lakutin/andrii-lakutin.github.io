import { toUTCDate } from 'nodemod/dist/calendar/helpers/to-utc-date.js';
export function toResolvedDate(date) {
    const tryDate = typeof date === 'string' && !Number.isNaN(Number(date)) ?
        Number(date) :
        date;
    const dateDate = tryDate === undefined ?
        new Date() :
        new Date(tryDate || NaN);
    const isUTCDateFormat = typeof tryDate === 'string' && (/^\d{4}-\d{2}-\d{2}$/.test(tryDate) ||
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(?:Z|\+00:00|-00:00)$/.test(tryDate));
    const isUnixTimestamp = typeof tryDate === 'number' &&
        tryDate > 0 &&
        isFinite(tryDate);
    let fy = dateDate.getFullYear();
    let m = dateDate.getMonth();
    let d = dateDate.getDate();
    if (isUTCDateFormat || isUnixTimestamp) {
        fy = dateDate.getUTCFullYear();
        m = dateDate.getUTCMonth();
        d = dateDate.getUTCDate();
    }
    return toUTCDate(fy, m, d);
}
