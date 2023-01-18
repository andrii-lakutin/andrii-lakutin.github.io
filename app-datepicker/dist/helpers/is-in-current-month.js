export function isInCurrentMonth(targetDate, sourceDate) {
    const targetDateFy = targetDate.getUTCFullYear();
    const targetDateM = targetDate.getUTCMonth();
    const sourceDateFY = sourceDate.getUTCFullYear();
    const sourceDateM = sourceDate.getUTCMonth();
    return targetDateFy === sourceDateFY && targetDateM === sourceDateM;
}
