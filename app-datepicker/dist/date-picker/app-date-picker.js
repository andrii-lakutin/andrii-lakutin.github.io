import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { appDatePickerName } from './constants.js';
import { DatePicker } from './date-picker.js';
let AppDatePicker = class AppDatePicker extends DatePicker {
};
AppDatePicker = __decorate([
    customElement(appDatePickerName)
], AppDatePicker);
export { AppDatePicker };
