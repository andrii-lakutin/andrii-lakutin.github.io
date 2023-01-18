export function warnUndefinedElement(elementName) {
    if (!globalThis.customElements.get(elementName)) {
        console.warn(`${elementName} is required`);
    }
}
