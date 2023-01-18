import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { appDatePickerDialogBaseName } from './constants.js';
import { DatePickerDialogBase } from './date-picker-dialog-base.js';
let AppDatePickerDialogBase = class AppDatePickerDialogBase extends DatePickerDialogBase {
};
AppDatePickerDialogBase = __decorate([
    customElement(appDatePickerDialogBaseName)
], AppDatePickerDialogBase);
export { AppDatePickerDialogBase };
