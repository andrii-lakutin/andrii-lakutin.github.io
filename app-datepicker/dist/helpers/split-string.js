export function splitString(source, splitFunction, separator = /,\s*/) {
    const dateList = typeof source === 'string' && source.length > 0
        ? source.split(separator)
        : [];
    if (!dateList.length)
        return [];
    if (splitFunction == null)
        return dateList;
    return dateList.map((n, i, arr) => splitFunction(n, i, arr));
}
