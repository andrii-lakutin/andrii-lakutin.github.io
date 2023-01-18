export async function focusElement(asyncSelector, thenCallback) {
    const resolvedElement = await asyncSelector;
    if (resolvedElement) {
        resolvedElement.focus();
        thenCallback?.(resolvedElement);
    }
    return resolvedElement;
}
