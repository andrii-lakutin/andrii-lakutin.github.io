import { __decorate } from "tslib";
import { property } from 'lit/decorators.js';
import { DateTimeFormat, labelChooseMonth, labelChooseYear, labelNextMonth, labelPreviousMonth, labelSelectedDate, labelSelectedYear, labelShortWeek, labelToday, labelToyear, labelWeek, weekNumberTemplate } from '../constants.js';
import { nullishAttributeConverter } from '../helpers/nullish-attribute-converter.js';
import { toDateString } from '../helpers/to-date-string.js';
import { toResolvedDate } from '../helpers/to-resolved-date.js';
export const DatePickerMixin = (SuperClass) => {
    class DatePickerMixinClass extends SuperClass {
        constructor() {
            super(...arguments);
            this.chooseYearLabel = labelChooseYear;
            this.chooseMonthLabel = labelChooseMonth;
            this.disabledDays = '';
            this.disabledDates = '';
            this.firstDayOfWeek = 0;
            this.locale = DateTimeFormat().resolvedOptions().locale;
            this.nextMonthLabel = labelNextMonth;
            this.previousMonthLabel = labelPreviousMonth;
            this.selectedDateLabel = labelSelectedDate;
            this.selectedYearLabel = labelSelectedYear;
            this.shortWeekLabel = labelShortWeek;
            this.showWeekNumber = false;
            this.startView = 'calendar';
            this.todayLabel = labelToday;
            this.toyearLabel = labelToyear;
            this.value = toDateString(toResolvedDate());
            this.weekLabel = labelWeek;
            this.weekNumberTemplate = weekNumberTemplate;
            this.weekNumberType = 'first-4-day-week';
        }
    }
    __decorate([
        property()
    ], DatePickerMixinClass.prototype, "chooseYearLabel", void 0);
    __decorate([
        property()
    ], DatePickerMixinClass.prototype, "chooseMonthLabel", void 0);
    __decorate([
        property()
    ], DatePickerMixinClass.prototype, "disabledDays", void 0);
    __decorate([
        property()
    ], DatePickerMixinClass.prototype, "disabledDates", void 0);
    __decorate([
        property({ type: Number, reflect: true })
    ], DatePickerMixinClass.prototype, "firstDayOfWeek", void 0);
    __decorate([
        property()
    ], DatePickerMixinClass.prototype, "locale", void 0);
    __decorate([
        property()
    ], DatePickerMixinClass.prototype, "nextMonthLabel", void 0);
    __decorate([
        property()
    ], DatePickerMixinClass.prototype, "previousMonthLabel", void 0);
    __decorate([
        property()
    ], DatePickerMixinClass.prototype, "selectedDateLabel", void 0);
    __decorate([
        property()
    ], DatePickerMixinClass.prototype, "selectedYearLabel", void 0);
    __decorate([
        property()
    ], DatePickerMixinClass.prototype, "shortWeekLabel", void 0);
    __decorate([
        property({ type: Boolean, reflect: true })
    ], DatePickerMixinClass.prototype, "showWeekNumber", void 0);
    __decorate([
        property({ reflect: true, converter: { toAttribute: nullishAttributeConverter } })
    ], DatePickerMixinClass.prototype, "startView", void 0);
    __decorate([
        property()
    ], DatePickerMixinClass.prototype, "todayLabel", void 0);
    __decorate([
        property()
    ], DatePickerMixinClass.prototype, "toyearLabel", void 0);
    __decorate([
        property()
    ], DatePickerMixinClass.prototype, "value", void 0);
    __decorate([
        property()
    ], DatePickerMixinClass.prototype, "weekLabel", void 0);
    __decorate([
        property()
    ], DatePickerMixinClass.prototype, "weekNumberTemplate", void 0);
    __decorate([
        property({ reflect: true, converter: { toAttribute: nullishAttributeConverter } })
    ], DatePickerMixinClass.prototype, "weekNumberType", void 0);
    return DatePickerMixinClass;
};
