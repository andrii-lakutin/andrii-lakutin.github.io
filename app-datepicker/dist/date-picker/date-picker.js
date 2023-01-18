import { __decorate } from "tslib";
import '../icon-button/app-icon-button.js';
import '../month-calendar/app-month-calendar.js';
import '../year-grid/app-year-grid.js';
import { html, nothing } from 'lit';
import { queryAsync, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { calendar } from 'nodemod/dist/calendar/calendar.js';
import { getWeekdays } from 'nodemod/dist/calendar/helpers/get-weekdays.js';
import { toUTCDate } from 'nodemod/dist/calendar/helpers/to-utc-date.js';
import { DateTimeFormat, MAX_DATE, startViews } from '../constants.js';
import { clampValue } from '../helpers/clamp-value.js';
import { dateValidator } from '../helpers/date-validator.js';
import { focusElement } from '../helpers/focus-element.js';
import { isInCurrentMonth } from '../helpers/is-in-current-month.js';
import { splitString } from '../helpers/split-string.js';
import { toDateString } from '../helpers/to-date-string.js';
import { toFormatters } from '../helpers/to-formatters.js';
import { toResolvedDate } from '../helpers/to-resolved-date.js';
import { appIconButtonName } from '../icon-button/constants.js';
import { iconArrowDropdown, iconChevronLeft, iconChevronRight } from '../icons.js';
import { DatePickerMinMaxMixin } from '../mixins/date-picker-min-max-mixin.js';
import { DatePickerMixin } from '../mixins/date-picker-mixin.js';
import { RootElement } from '../root-element/root-element.js';
import { baseStyling, resetShadowRoot, webkitScrollbarStyling } from '../stylings.js';
import { datePickerStyling } from './stylings.js';
export class DatePicker extends DatePickerMixin(DatePickerMinMaxMixin(RootElement)) {
    get valueAsDate() {
        return this.#valueAsDate;
    }
    get valueAsNumber() {
        return +this.#valueAsDate;
    }
    #formatters;
    #focusNavButtonWithKey;
    #today;
    #valueAsDate;
    static { this.styles = [
        baseStyling,
        resetShadowRoot,
        datePickerStyling,
        webkitScrollbarStyling,
    ]; }
    constructor() {
        super();
        this.#focusNavButtonWithKey = false;
        this.#navigateMonth = (ev) => {
            const currentDate = this._currentDate;
            const isPreviousNavigation = ev.currentTarget.getAttribute('data-navigation') === 'previous';
            const newCurrentDate = toUTCDate(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + (isPreviousNavigation ? -1 : 1), 1);
            this._currentDate = newCurrentDate;
            this.#focusNavButtonWithKey = ev.detail === 0;
        };
        this.#queryAllFocusable = async () => {
            const isStartViewCalendar = this.startView === 'calendar';
            const focusable = [
                ...this.queryAll(appIconButtonName),
                (await (isStartViewCalendar ? this._monthCalendar : this._yearGrid))
                    ?.query(`.${isStartViewCalendar ? 'calendar-day' : 'year-grid-button'}[aria-selected="true"]`),
            ].filter(Boolean);
            return focusable;
        };
        this.#renderCalendar = () => {
            const { _currentDate, _max, _min, _selectedDate, disabledDates, disabledDays, firstDayOfWeek, locale, selectedDateLabel, shortWeekLabel, showWeekNumber, todayLabel, weekLabel, weekNumberTemplate, weekNumberType, } = this;
            const currentDate = _currentDate;
            const formatters = this.#formatters;
            const max = _max;
            const min = _min;
            const selectedDate = _selectedDate;
            const { dayFormat, fullDateFormat, longWeekdayFormat, narrowWeekdayFormat, } = this.#formatters;
            const weekdays = getWeekdays({
                firstDayOfWeek,
                longWeekdayFormat,
                narrowWeekdayFormat,
                shortWeekLabel,
                showWeekNumber,
                weekLabel,
            });
            const { calendar: calendarMonth, disabledDatesSet, disabledDaysSet, } = calendar({
                date: currentDate,
                dayFormat,
                disabledDates: splitString(disabledDates, toResolvedDate),
                disabledDays: splitString(disabledDays, Number),
                firstDayOfWeek,
                fullDateFormat,
                locale,
                max,
                min,
                showWeekNumber,
                weekNumberTemplate,
                weekNumberType,
            });
            return html `
    <app-month-calendar
      .data=${{
                calendar: calendarMonth,
                currentDate,
                date: selectedDate,
                disabledDatesSet,
                disabledDaysSet,
                formatters,
                max,
                min,
                selectedDateLabel,
                showWeekNumber,
                todayDate: this.#today,
                todayLabel,
                weekdays,
            }}
      @date-updated=${this.#updateSelectedDate}
      class=calendar
      exportparts=table,caption,weekdays,weekday,weekday-value,week-number,calendar-day,today,calendar
    ></app-month-calendar>
    `;
        };
        this.#renderNavigationButton = (navigationType, shouldSkipRender = true) => {
            const isPreviousNavigationType = navigationType === 'previous';
            const label = isPreviousNavigationType ? this.previousMonthLabel : this.nextMonthLabel;
            return shouldSkipRender ?
                html `<div data-navigation=${navigationType}></div>` :
                html `
      <app-icon-button
        .ariaLabel=${label}
        @click=${this.#navigateMonth}
        data-navigation=${navigationType}
        title=${ifDefined(label)}
      >${isPreviousNavigationType ? iconChevronLeft : iconChevronRight}</app-icon-button>
      `;
        };
        this.#renderYearGrid = () => {
            const { _max, _min, _selectedDate, selectedYearLabel, toyearLabel, } = this;
            return html `
    <app-year-grid
      class=year-grid
      .data=${{
                date: _selectedDate,
                formatters: this.#formatters,
                max: _max,
                min: _min,
                selectedYearLabel,
                toyearLabel,
            }}
      @year-updated=${this.#updateYear}
      exportparts=year-grid,year,toyear
    ></app-year-grid>
    `;
        };
        this.#updateSelectedDate = ({ detail: { value }, }) => {
            const selectedDate = new Date(value);
            this._selectedDate = selectedDate;
            this._currentDate = new Date(selectedDate);
            this.value = toDateString(selectedDate);
        };
        this.#updateStartView = () => {
            this.startView = this.startView === 'yearGrid' ? 'calendar' : 'yearGrid';
        };
        this.#updateYear = ({ detail: { year }, }) => {
            this._currentDate = new Date(this._currentDate.setUTCFullYear(year));
            this.startView = 'calendar';
        };
        const todayDate = toResolvedDate();
        this._min = new Date(todayDate);
        this._max = new Date(MAX_DATE);
        this.#today = todayDate;
        this._selectedDate = new Date(todayDate);
        this._currentDate = new Date(todayDate);
        this.#formatters = toFormatters(this.locale);
        this.#valueAsDate = new Date(todayDate);
    }
    willUpdate(changedProperties) {
        if (changedProperties.has('locale')) {
            const newLocale = (this.locale || DateTimeFormat().resolvedOptions().locale);
            this.#formatters = toFormatters(newLocale);
            this.locale = newLocale;
        }
        const dateRangeProps = [
            'max',
            'min',
            'value',
        ];
        if (dateRangeProps.some(n => changedProperties.has(n))) {
            const todayDate = this.#today;
            const [newMax, newMin, newValue,] = [
                ['max', MAX_DATE],
                ['min', todayDate],
                ['value', todayDate],
            ].map(([propKey, resetValue]) => {
                const currentValue = this[propKey];
                const defaultValue = toResolvedDate(changedProperties.get(propKey) ?? resetValue);
                const valueWithReset = currentValue === undefined ? resetValue : currentValue;
                return dateValidator(valueWithReset, defaultValue);
            });
            const valueDate = toResolvedDate(clampValue(+newMin.date, +newMax.date, +newValue.date));
            this._min = newMin.date;
            this._max = newMax.date;
            this._currentDate = new Date(valueDate);
            this._selectedDate = new Date(valueDate);
            this.#valueAsDate = new Date(valueDate);
            if (!this.max)
                this.max = toDateString(newMax.date);
            if (!this.min)
                this.min = toDateString(newMin.date);
            if (!this.value) {
                const valueStr = toDateString(valueDate);
                this.value = valueStr;
                this.fire({
                    detail: {
                        isKeypress: false,
                        value: valueStr,
                        valueAsDate: new Date(valueDate),
                        valueAsNumber: +valueDate,
                    },
                    type: 'date-updated',
                });
            }
        }
        if (changedProperties.has('startView')) {
            const oldStartView = (changedProperties.get('startView') || 'calendar');
            const { _max, _min, _selectedDate, startView, } = this;
            if (!startViews.includes(startView)) {
                this.startView = oldStartView;
            }
            if (startView === 'calendar') {
                const newSelectedYear = new Date(clampValue(+_min, +_max, +_selectedDate));
                this._selectedDate = newSelectedYear;
            }
        }
    }
    async firstUpdated() {
        const valueAsDate = this.#valueAsDate;
        this.fire({
            detail: {
                focusableElements: await this.#queryAllFocusable(),
                value: toDateString(valueAsDate),
                valueAsDate: new Date(valueAsDate),
                valueAsNumber: +valueAsDate,
            },
            type: 'first-updated',
        });
    }
    async updated(changedProperties) {
        const { _currentDate, _max, _min, _navigationNext, _navigationPrevious, _yearDropdown, startView, } = this;
        if (changedProperties.get('startView') === 'yearGrid' &&
            startView === 'calendar') {
            (await _yearDropdown)?.focus();
        }
        if (startView === 'calendar') {
            if (changedProperties.has('_currentDate') && this.#focusNavButtonWithKey) {
                isInCurrentMonth(_min, _currentDate) && focusElement(_navigationNext);
                isInCurrentMonth(_max, _currentDate) && focusElement(_navigationPrevious);
                this.#focusNavButtonWithKey = false;
            }
        }
    }
    render() {
        const { _currentDate, _max, _min, chooseMonthLabel, chooseYearLabel, showWeekNumber, startView, } = this;
        const formatters = this.#formatters;
        const { longMonthYearFormat } = formatters;
        const selectedYearMonth = longMonthYearFormat(_currentDate);
        const isStartViewYearGrid = startView === 'yearGrid';
        const label = isStartViewYearGrid ? chooseMonthLabel : chooseYearLabel;
        return html `
    <div class=header part=header>
      <div class=month-and-year-selector>
        <p class=selected-year-month>${selectedYearMonth}</p>

        <app-icon-button
          .ariaLabel=${label}
          @click=${this.#updateStartView}
          class=year-dropdown
          title=${ifDefined(label)}
        >${iconArrowDropdown}</app-icon-button>
      </div>

      ${isStartViewYearGrid ?
            nothing :
            html `
          <div class=month-pagination>
            ${this.#renderNavigationButton('previous', isInCurrentMonth(_min, _currentDate))}
            ${this.#renderNavigationButton('next', isInCurrentMonth(_max, _currentDate))}
          </div>
          `}
    </div>

    <div class="body ${classMap({
            [`start-view--${startView}`]: true,
            'show-week-number': showWeekNumber,
        })}" part=body>${(isStartViewYearGrid ? this.#renderYearGrid : this.#renderCalendar)()}</div>
    `;
    }
    #navigateMonth;
    #queryAllFocusable;
    #renderCalendar;
    #renderNavigationButton;
    #renderYearGrid;
    #updateSelectedDate;
    #updateStartView;
    #updateYear;
}
__decorate([
    queryAsync('app-month-calendar')
], DatePicker.prototype, "_monthCalendar", void 0);
__decorate([
    queryAsync('[data-navigation="previous"]')
], DatePicker.prototype, "_navigationPrevious", void 0);
__decorate([
    queryAsync('[data-navigation="next"]')
], DatePicker.prototype, "_navigationNext", void 0);
__decorate([
    queryAsync('.year-dropdown')
], DatePicker.prototype, "_yearDropdown", void 0);
__decorate([
    queryAsync('app-year-grid')
], DatePicker.prototype, "_yearGrid", void 0);
__decorate([
    state()
], DatePicker.prototype, "_currentDate", void 0);
__decorate([
    state()
], DatePicker.prototype, "_max", void 0);
__decorate([
    state()
], DatePicker.prototype, "_min", void 0);
__decorate([
    state()
], DatePicker.prototype, "_selectedDate", void 0);
