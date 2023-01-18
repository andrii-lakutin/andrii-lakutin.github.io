import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { appMonthCalendarName } from './constants.js';
import { MonthCalendar } from './month-calendar.js';
let AppMonthCalendar = class AppMonthCalendar extends MonthCalendar {
};
AppMonthCalendar = __decorate([
    customElement(appMonthCalendarName)
], AppMonthCalendar);
export { AppMonthCalendar };
