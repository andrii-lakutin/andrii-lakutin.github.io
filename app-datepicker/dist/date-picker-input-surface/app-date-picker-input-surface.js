import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { appDatePickerInputSurfaceName } from './constants.js';
import { DatePickerInputSurface } from './date-picker-input-surface.js';
let AppDatePickerInputSurface = class AppDatePickerInputSurface extends DatePickerInputSurface {
};
AppDatePickerInputSurface = __decorate([
    customElement(appDatePickerInputSurfaceName)
], AppDatePickerInputSurface);
export { AppDatePickerInputSurface };
