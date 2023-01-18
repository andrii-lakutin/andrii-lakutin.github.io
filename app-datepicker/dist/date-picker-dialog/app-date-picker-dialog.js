import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { appDatePickerDialogName } from './constants.js';
import { DatePickerDialog } from './date-picker-dialog.js';
let AppDatePickerDialog = class AppDatePickerDialog extends DatePickerDialog {
};
AppDatePickerDialog = __decorate([
    customElement(appDatePickerDialogName)
], AppDatePickerDialog);
export { AppDatePickerDialog };
