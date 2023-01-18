export function toDayDiffInclusive(min, max) {
    return 1 + Math.floor((+max - +min) / 864e5);
}
