import { __decorate } from "tslib";
import { html, nothing } from 'lit';
import { property, queryAsync } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { confirmKeySet, labelSelectedDate, labelToday, navigationKeySetGrid } from '../constants.js';
import { focusElement } from '../helpers/focus-element.js';
import { isInCurrentMonth } from '../helpers/is-in-current-month.js';
import { toClosestTarget } from '../helpers/to-closest-target.js';
import { toDateString } from '../helpers/to-date-string.js';
import { toNextSelectedDate } from '../helpers/to-next-selected-date.js';
import { toResolvedDate } from '../helpers/to-resolved-date.js';
import { keyHome } from '../key-values.js';
import { RootElement } from '../root-element/root-element.js';
import { baseStyling, resetShadowRoot } from '../stylings.js';
import { monthCalendarStyling } from './stylings.js';
export class MonthCalendar extends RootElement {
    #selectedDate;
    #shouldFocusSelectedDate;
    static { this.shadowRootOptions = {
        ...RootElement.shadowRootOptions,
        delegatesFocus: true,
    }; }
    static { this.styles = [
        baseStyling,
        resetShadowRoot,
        monthCalendarStyling,
    ]; }
    constructor() {
        super();
        this.#selectedDate = undefined;
        this.#shouldFocusSelectedDate = false;
        this.#updateSelectedDate = (event) => {
            const key = event.key;
            const type = event.type;
            if (type === 'keydown') {
                event.stopImmediatePropagation();
                const isConfirmKey = confirmKeySet.has(key);
                if (!navigationKeySetGrid.has(key) &&
                    !isConfirmKey)
                    return;
                event.preventDefault();
                if (isConfirmKey)
                    return;
                const { currentDate, date, disabledDatesSet, disabledDaysSet, max, min, } = this.data;
                this.#selectedDate = toNextSelectedDate({
                    currentDate,
                    date,
                    disabledDatesSet,
                    disabledDaysSet,
                    hasAltKey: event.altKey,
                    key,
                    maxTime: +max,
                    minTime: +min,
                });
                this.#shouldFocusSelectedDate = true;
            }
            else if (type === 'click' ||
                (type === 'keyup' &&
                    confirmKeySet.has(key))) {
                const selectedCalendarDay = toClosestTarget(event, '.calendar-day');
                if (selectedCalendarDay == null ||
                    [
                        'aria-disabled',
                        'aria-hidden',
                    ].some(attrName => selectedCalendarDay.getAttribute(attrName) === 'true')) {
                    return;
                }
                this.#selectedDate = selectedCalendarDay.fullDate;
            }
            const selectedDate = this.#selectedDate;
            if (selectedDate == null)
                return;
            const isKeypress = Boolean(key);
            const newSelectedDate = new Date(selectedDate);
            this.fire({
                detail: {
                    isKeypress,
                    value: toDateString(newSelectedDate),
                    valueAsDate: newSelectedDate,
                    valueAsNumber: +newSelectedDate,
                    ...(isKeypress && { key }),
                },
                type: 'date-updated',
            });
            this.#selectedDate = undefined;
        };
        const todayDate = toResolvedDate();
        this.data = {
            calendar: [],
            currentDate: todayDate,
            date: todayDate,
            disabledDatesSet: new Set(),
            disabledDaysSet: new Set(),
            formatters: undefined,
            max: todayDate,
            min: todayDate,
            selectedDateLabel: labelSelectedDate,
            showCaption: false,
            showWeekNumber: false,
            todayDate,
            todayLabel: labelToday,
            weekdays: [],
        };
    }
    shouldUpdate() {
        return this.data != null && this.data.formatters != null;
    }
    async updated() {
        if (this.#shouldFocusSelectedDate) {
            await focusElement(this.selectedCalendarDay);
            this.#shouldFocusSelectedDate = false;
        }
    }
    render() {
        const { calendar, currentDate, date, disabledDatesSet, disabledDaysSet, formatters, max, min, selectedDateLabel, showCaption = false, showWeekNumber = false, todayDate, todayLabel, weekdays, } = this.data;
        let calendarContent = nothing;
        if (calendar.length) {
            const id = this.id;
            const { longMonthYearFormat } = formatters;
            const calendarCaptionId = `calendar-caption-${id}`;
            const [, [, secondMonthSecondCalendarDay]] = calendar;
            const secondMonthSecondCalendarDayFullDate = secondMonthSecondCalendarDay.fullDate;
            const tabbableDate = isInCurrentMonth(date, currentDate) ?
                date :
                toNextSelectedDate({
                    currentDate,
                    date,
                    disabledDatesSet,
                    disabledDaysSet,
                    hasAltKey: false,
                    key: keyHome,
                    maxTime: +max,
                    minTime: +min,
                });
            calendarContent = html `
      <table
        @click=${this.#updateSelectedDate}
        @keydown=${this.#updateSelectedDate}
        @keyup=${this.#updateSelectedDate}
        aria-labelledby=${calendarCaptionId}
        class=calendar-table
        part=table
        role=grid
        tabindex=-1
      >
        ${showCaption && secondMonthSecondCalendarDayFullDate ? html `
          <caption id=${calendarCaptionId}>
            <div class=calendar-caption part=caption>${longMonthYearFormat(secondMonthSecondCalendarDayFullDate)}</div>
          </caption>
          ` : nothing}

        <thead>
          <tr class=weekdays part=weekdays role=row>${weekdays.map(({ label, value }, idx) => html `
                <th
                  aria-label=${label}
                  class=${`weekday${showWeekNumber && idx < 1 ? ' week-number' : ''}`}
                  part=weekday
                  role=columnheader
                  title=${label}
                >
                  <div class=weekday-value part=weekday-value>${value}</div>
                </th>`)}</tr>
        </thead>

        <tbody>${calendar.map((calendarRow) => {
                return html `
            <tr role=row>${calendarRow.map((calendarCol, i) => {
                    const { disabled, fullDate, label, value } = calendarCol;
                    if (!fullDate && value && showWeekNumber && i < 1) {
                        return html `<th
                    abbr=${label}
                    aria-label=${label}
                    class="calendar-day week-number"
                    part=week-number
                    role=rowheader
                    scope=row
                    title=${label}
                  >${value}</th>`;
                    }
                    if (!value || !fullDate) {
                        return html `<td class="calendar-day day--empty" aria-hidden="true" part=calendar-day></td>`;
                    }
                    const curTime = +new Date(fullDate);
                    const shouldTab = tabbableDate.getUTCDate() === Number(value);
                    const isSelected = +date === curTime;
                    const isToday = +todayDate === curTime;
                    const title = isSelected ?
                        selectedDateLabel :
                        isToday ?
                            todayLabel :
                            undefined;
                    return this.$renderCalendarDay({
                        ariaDisabled: String(disabled),
                        ariaLabel: label,
                        ariaSelected: String(isSelected),
                        className: isToday ? 'day--today' : '',
                        day: value,
                        fullDate,
                        tabIndex: shouldTab ? 0 : -1,
                        title,
                        part: `calendar-day${isToday ? ' today' : ''}`,
                    });
                })}</tr>`;
            })}</tbody>
      </table>
      `;
        }
        return html `<div class=month-calendar part=calendar>${calendarContent}</div>`;
    }
    $renderCalendarDay({ ariaDisabled, ariaLabel, ariaSelected, className, day, fullDate, part, tabIndex, title, }) {
        return html `
    <td
      .fullDate=${fullDate}
      aria-disabled=${ariaDisabled}
      aria-label=${ariaLabel}
      aria-selected=${ariaSelected}
      class="calendar-day ${className}"
      data-day=${day}
      part=${part}
      role=gridcell
      tabindex=${tabIndex}
      title=${ifDefined(title)}
    >
    </td>
    `;
    }
    #updateSelectedDate;
}
__decorate([
    property({ attribute: false })
], MonthCalendar.prototype, "data", void 0);
__decorate([
    queryAsync('.calendar-day[aria-selected="true"]')
], MonthCalendar.prototype, "selectedCalendarDay", void 0);
