import { toResolvedDate } from './to-resolved-date.js';
export function dateValidator(value, defaultDate) {
    const dateDate = toResolvedDate(value);
    const isValid = !Number.isNaN(+dateDate);
    return {
        date: isValid ? dateDate : defaultDate,
        isValid,
    };
}
