import { __decorate } from "tslib";
import { html } from 'lit';
import { property, queryAsync, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { labelSelectedYear, labelToyear, MAX_DATE, navigationKeySetGrid } from '../constants.js';
import { toClosestTarget } from '../helpers/to-closest-target.js';
import { toResolvedDate } from '../helpers/to-resolved-date.js';
import { toYearList } from '../helpers/to-year-list.js';
import { RootElement } from '../root-element/root-element.js';
import { baseStyling, resetButton, resetShadowRoot } from '../stylings.js';
import { yearGridStyling } from './stylings.js';
import { toNextSelectedYear } from './to-next-selected-year.js';
export class YearGrid extends RootElement {
    #todayYear;
    static { this.styles = [
        baseStyling,
        resetButton,
        resetShadowRoot,
        yearGridStyling,
    ]; }
    constructor() {
        super();
        this.#updateYear = (event) => {
            if (event.type === 'keydown') {
                event.stopImmediatePropagation();
                const key = event.key;
                if (!navigationKeySetGrid.has(key))
                    return;
                event.preventDefault();
                const { max, min, } = this.data;
                const focusingYear = toNextSelectedYear({
                    key,
                    max,
                    min,
                    year: this.$focusingYear,
                });
                const focusingYearGridButton = this.query(`button[data-year="${focusingYear}"]`);
                this.$focusingYear = focusingYear;
                focusingYearGridButton?.focus();
            }
            else if (event.type === 'click') {
                const selectedYearStr = toClosestTarget(event, `button[data-year]`)
                    ?.getAttribute('data-year');
                if (selectedYearStr == null)
                    return;
                const year = Number(selectedYearStr);
                this.$focusingYear = year;
                this.fire({
                    detail: {
                        year,
                    },
                    type: 'year-updated',
                });
            }
        };
        const todayDate = toResolvedDate();
        this.data = {
            date: todayDate,
            formatters: undefined,
            max: MAX_DATE,
            min: todayDate,
            selectedYearLabel: labelSelectedYear,
            toyearLabel: labelToyear,
        };
        this.$focusingYear = this.#todayYear = todayDate.getUTCFullYear();
    }
    shouldUpdate() {
        return this.data != null && this.data.formatters != null;
    }
    willUpdate(changedProperties) {
        if (changedProperties.has('data') && this.data) {
            const { date } = this.data;
            if (date) {
                this.$focusingYear = date.getUTCFullYear();
            }
        }
    }
    async updated() {
        this.scrollTop = Math.floor((this.$focusingYear - this.data.min.getUTCFullYear()) / 4) * 32;
    }
    render() {
        const { date, formatters, max, min, selectedYearLabel, toyearLabel, } = this.data;
        const focusingYear = this.$focusingYear;
        const { yearFormat } = formatters;
        const yearList = toYearList(min, max);
        return html `
    <div
      @click=${this.#updateYear}
      @keydown=${this.#updateYear}
      @keyup=${this.#updateYear}
      class="year-grid"
      part=year-grid
    >${yearList.map((year) => {
            const isSelected = year === date.getUTCFullYear();
            const isToday = this.#todayYear === year;
            const title = isSelected ?
                selectedYearLabel :
                isToday
                    ? toyearLabel
                    : undefined;
            return this.$renderButton({
                ariaLabel: yearFormat(new Date(`${year}-01-01`)),
                ariaSelected: isSelected ? 'true' : 'false',
                className: isToday ? ' year--today' : '',
                date,
                part: `year${isToday ? ' toyear' : ''}`,
                tabIndex: year === focusingYear ? 0 : -1,
                title,
                toyearLabel,
                year,
            });
        })}</div>
    `;
    }
    $renderButton({ ariaLabel, ariaSelected, className, part, tabIndex, title, year, }) {
        return html `
    <button
      .year=${year}
      aria-label=${ariaLabel}
      aria-selected=${ariaSelected}
      class="year-grid-button${className}"
      data-year=${year}
      part=${part}
      tabindex=${tabIndex}
      title=${ifDefined(title)}
    ></button>
    `;
    }
    #updateYear;
}
__decorate([
    property({ attribute: false })
], YearGrid.prototype, "data", void 0);
__decorate([
    queryAsync('button[data-year][aria-selected="true"]')
], YearGrid.prototype, "selectedYearGridButton", void 0);
__decorate([
    queryAsync('.year-grid')
], YearGrid.prototype, "yearGrid", void 0);
__decorate([
    state()
], YearGrid.prototype, "$focusingYear", void 0);
