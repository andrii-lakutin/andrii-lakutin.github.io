export function toClosestTarget(event, selector) {
    const matchedTarget = Array.from(event.composedPath()).find(element => element.nodeType === Node.ELEMENT_NODE && element.matches(selector));
    return matchedTarget;
}
