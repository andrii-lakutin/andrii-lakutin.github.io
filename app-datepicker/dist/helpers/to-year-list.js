import { toDayDiffInclusive } from './to-day-diff-inclusive.js';
export function toYearList(min, max) {
    if (toDayDiffInclusive(min, max) < 1)
        return [];
    const fy = min.getUTCFullYear();
    return Array.from(Array(max.getUTCFullYear() - fy + 1), (_, i) => i + fy);
}
