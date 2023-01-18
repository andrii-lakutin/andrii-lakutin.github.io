import { __decorate } from "tslib";
import { property } from 'lit/decorators.js';
import { nullishAttributeConverter } from '../helpers/nullish-attribute-converter.js';
export const DatePickerMinMaxMixin = (SuperClass) => {
    class DatePickerMinMaxClass extends SuperClass {
    }
    __decorate([
        property({ reflect: true, converter: { toAttribute: nullishAttributeConverter } })
    ], DatePickerMinMaxClass.prototype, "max", void 0);
    __decorate([
        property({ reflect: true, converter: { toAttribute: nullishAttributeConverter } })
    ], DatePickerMinMaxClass.prototype, "min", void 0);
    return DatePickerMinMaxClass;
};
