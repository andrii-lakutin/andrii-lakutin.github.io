export const ElementMixin = (SuperClass) => {
    class ElementMixinClass extends SuperClass {
        fire({ detail, type, }) {
            this.dispatchEvent(new CustomEvent(type, {
                bubbles: true,
                composed: true,
                detail,
            }));
        }
        query(selector) {
            return this.root.querySelector(selector);
        }
        queryAll(selector) {
            return Array.from(this.root.querySelectorAll(selector) ?? []);
        }
        get root() {
            return this.shadowRoot;
        }
    }
    return ElementMixinClass;
};
