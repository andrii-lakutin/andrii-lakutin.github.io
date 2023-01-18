export function toDateString(date) {
    return date.toISOString().replace(/^(.+)T.+/i, '$1');
}
