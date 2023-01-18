import { __decorate } from "tslib";
import '@material/mwc-button';
import '@material/mwc-dialog';
import '../date-picker/app-date-picker.js';
import './app-date-picker-dialog-base.js';
import { html, nothing } from 'lit';
import { property, queryAsync, state } from 'lit/decorators.js';
import { appDatePickerName } from '../date-picker/constants.js';
import { slotDatePicker } from '../helpers/slot-date-picker.js';
import { toDateString } from '../helpers/to-date-string.js';
import { toResolvedDate } from '../helpers/to-resolved-date.js';
import { DatePickerMinMaxMixin } from '../mixins/date-picker-min-max-mixin.js';
import { DatePickerMixin } from '../mixins/date-picker-mixin.js';
import { RootElement } from '../root-element/root-element.js';
import { baseStyling } from '../stylings.js';
import { datePickerDialogStyling } from './stylings.js';
export class DatePickerDialog extends DatePickerMixin(DatePickerMinMaxMixin(RootElement)) {
    get valueAsDate() {
        return this.#valueAsDate;
    }
    get valueAsNumber() {
        return +this.#valueAsDate;
    }
    #isResetAction;
    #selectedDate;
    #valueAsDate;
    static { this.styles = [
        baseStyling,
        datePickerDialogStyling,
    ]; }
    constructor() {
        super();
        this.confirmLabel = 'set';
        this.dismissLabel = 'cancel';
        this.open = false;
        this.resetLabel = 'reset';
        this._rendered = false;
        this.#isResetAction = false;
        this.#onClosed = async (ev) => {
            const datePicker = await this._datePicker;
            this.hide();
            datePicker && (datePicker.startView = 'calendar');
            this.fire({ detail: ev.detail, type: 'closed' });
        };
        this.#onClosing = ({ detail, }) => {
            if (detail.action === 'set') {
                const selectedDate = this.#selectedDate;
                this.#valueAsDate = new Date(selectedDate);
                this.value = toDateString(selectedDate);
            }
            this.fire({ detail, type: 'closing' });
        };
        this.#onOpened = ({ detail }) => {
            this.fire({ detail, type: 'opened' });
        };
        this.#onOpening = ({ detail }) => {
            this.fire({ detail, type: 'opening' });
        };
        this.#onResetClick = () => {
            this.#isResetAction = true;
            this.value = undefined;
        };
        this.#selectedDate = this.#valueAsDate = toResolvedDate();
    }
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        if (!this._rendered && this.open) {
            this._rendered = true;
        }
    }
    updated(changedProperties) {
        if (changedProperties.has('value')) {
            this.#selectedDate = this.#valueAsDate = toResolvedDate(this.value);
        }
    }
    render() {
        const { _rendered, confirmLabel, dismissLabel, open, resetLabel, } = this;
        return html `
    <app-date-picker-dialog-base
      ?open=${open}
      @closed=${this.#onClosed}
      @closing=${this.#onClosing}
      @date-updated=${this.$onDatePickerDateUpdated}
      @first-updated=${this.$onDatePickerFirstUpdated}
      @opened=${this.#onOpened}
      @opening=${this.#onOpening}
    >
      ${_rendered ? html `
      ${this.open ? this.$renderSlot() : nothing}

      <div class=secondary-actions slot=secondaryAction>
        <mwc-button
          @click=${this.#onResetClick}
          data-dialog-action=reset
        >${resetLabel}</mwc-button>
        <mwc-button
          dialogAction=cancel
        >${dismissLabel}</mwc-button>
      </div>

      <mwc-button
        dialogAction=set
        slot=primaryAction
      >${confirmLabel}</mwc-button>
      ` : nothing}
    </app-date-picker-dialog-base>
    `;
    }
    hide() {
        this.open = false;
    }
    show() {
        this.open = true;
    }
    $onDatePickerDateUpdated({ detail: { valueAsDate, }, }) {
        this.#selectedDate = new Date(valueAsDate);
        if (this.#isResetAction || !this.value) {
            this.#isResetAction = false;
            this.#valueAsDate = new Date(valueAsDate);
            this.value = toDateString(valueAsDate);
        }
    }
    $onDatePickerFirstUpdated({ detail: { valueAsDate, }, }) {
        this.#selectedDate = this.#valueAsDate = valueAsDate;
    }
    $renderSlot() {
        const { chooseMonthLabel, chooseYearLabel, disabledDates, disabledDays, firstDayOfWeek, locale, max, min, nextMonthLabel, previousMonthLabel, selectedDateLabel, selectedYearLabel, shortWeekLabel, showWeekNumber, startView, todayLabel, toyearLabel, value, weekLabel, weekNumberTemplate, weekNumberType, } = this;
        return slotDatePicker({
            chooseMonthLabel,
            chooseYearLabel,
            disabledDates,
            disabledDays,
            firstDayOfWeek,
            locale,
            max,
            min,
            nextMonthLabel,
            onDatePickerDateUpdated: this.$onDatePickerDateUpdated,
            onDatePickerFirstUpdated: this.$onDatePickerFirstUpdated,
            previousMonthLabel,
            selectedDateLabel,
            selectedYearLabel,
            shortWeekLabel,
            showWeekNumber,
            startView,
            todayLabel,
            toyearLabel,
            value,
            weekLabel,
            weekNumberTemplate,
            weekNumberType,
        });
    }
    #onClosed;
    #onClosing;
    #onOpened;
    #onOpening;
    #onResetClick;
}
__decorate([
    property({ type: String })
], DatePickerDialog.prototype, "confirmLabel", void 0);
__decorate([
    property({ type: String })
], DatePickerDialog.prototype, "dismissLabel", void 0);
__decorate([
    property({ type: Boolean })
], DatePickerDialog.prototype, "open", void 0);
__decorate([
    property({ type: String })
], DatePickerDialog.prototype, "resetLabel", void 0);
__decorate([
    queryAsync(appDatePickerName)
], DatePickerDialog.prototype, "_datePicker", void 0);
__decorate([
    state()
], DatePickerDialog.prototype, "_rendered", void 0);
