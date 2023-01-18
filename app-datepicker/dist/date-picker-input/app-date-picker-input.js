import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { appDatePickerInputName } from './constants.js';
import { DatePickerInput } from './date-picker-input.js';
let AppDatePickerInput = class AppDatePickerInput extends DatePickerInput {
};
AppDatePickerInput = __decorate([
    customElement(appDatePickerInputName)
], AppDatePickerInput);
export { AppDatePickerInput };
