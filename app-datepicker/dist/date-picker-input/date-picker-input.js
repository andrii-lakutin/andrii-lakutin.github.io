import { __decorate } from "tslib";
import '../icon-button/app-icon-button.js';
import { TextField } from '@material/mwc-textfield';
import { html, nothing } from 'lit';
import { property, queryAsync, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DateTimeFormat } from '../constants.js';
import { appDatePickerName } from '../date-picker/constants.js';
import { appDatePickerInputSurfaceName } from '../date-picker-input-surface/constants.js';
import { slotDatePicker } from '../helpers/slot-date-picker.js';
import { toDateString } from '../helpers/to-date-string.js';
import { warnUndefinedElement } from '../helpers/warn-undefined-element.js';
import { appIconButtonName } from '../icon-button/constants.js';
import { iconClear } from '../icons.js';
import { keyEnter, keyEscape, keySpace, keyTab } from '../key-values.js';
import { DatePickerMinMaxMixin } from '../mixins/date-picker-min-max-mixin.js';
import { DatePickerMixin } from '../mixins/date-picker-mixin.js';
import { ElementMixin } from '../mixins/element-mixin.js';
import { baseStyling } from '../stylings.js';
import { appDatePickerInputClearLabel, appDatePickerInputType } from './constants.js';
import { datePickerInputStyling } from './stylings.js';
export class DatePickerInput extends ElementMixin(DatePickerMixin(DatePickerMinMaxMixin(TextField))) {
    constructor() {
        super(...arguments);
        this.iconTrailing = 'clear';
        this.type = appDatePickerInputType;
        this.clearLabel = appDatePickerInputClearLabel;
        this._disabled = false;
        this._lazyLoaded = false;
        this._open = false;
        this.#disconnect = () => undefined;
        this.#focusElement = undefined;
        this.#lazyLoading = false;
        this.#picker = undefined;
        this.#valueFormatter = this.$toValueFormatter();
        this.#lazyLoad = async () => {
            if (this._lazyLoaded || this.#lazyLoading)
                return;
            const deps = [
                appDatePickerName,
                appDatePickerInputSurfaceName,
            ];
            if (deps.some(n => globalThis.customElements.get(n) == null)) {
                this.#lazyLoading = true;
                const tasks = deps.map(n => globalThis.customElements.whenDefined(n));
                const imports = [
                    import('../date-picker/app-date-picker.js'),
                    import('../date-picker-input-surface/app-date-picker-input-surface.js'),
                ];
                try {
                    await Promise.all(imports);
                    await Promise.all(tasks);
                }
                catch (error) {
                    console.error(error);
                }
            }
            await this.updateComplete;
            this.#lazyLoading = false;
            this._lazyLoaded = true;
        };
        this.#onResetClick = (ev) => {
            if (this._disabled)
                return;
            ev.preventDefault();
            this.reset();
        };
        this.#onClosed = ({ detail }) => {
            this._open = false;
            this.fire({ detail, type: 'closed' });
        };
        this.#onDatePickerDateUpdated = async (ev) => {
            const { isKeypress, key, valueAsDate, } = ev.detail;
            if (!isKeypress || (key === keyEnter || key === keySpace)) {
                this.#updateValues(valueAsDate);
                isKeypress && (await this.$inputSurface)?.close();
            }
        };
        this.#onDatePickerFirstUpdated = ({ currentTarget, detail: { focusableElements: [focusableElement], valueAsDate, }, }) => {
            this.#focusElement = focusableElement;
            this.#picker = currentTarget;
            this.#updateValues(valueAsDate);
        };
        this.#onOpened = async ({ detail }) => {
            await this.#picker?.updateComplete;
            await this.updateComplete;
            this.#focusElement?.focus();
            this.fire({ detail, type: 'opened' });
        };
        this.#updateValues = (value) => {
            if (value) {
                const valueDate = new Date(value);
                this.#valueAsDate = valueDate;
                this.value = toDateString(valueDate);
            }
            else {
                this.reset();
            }
        };
    }
    get valueAsDate() {
        return this.#valueAsDate || null;
    }
    get valueAsNumber() {
        return Number(this.#valueAsDate || NaN);
    }
    #disconnect;
    #focusElement;
    #lazyLoading;
    #picker;
    #valueAsDate;
    #valueFormatter;
    static { this.styles = [
        ...TextField.styles,
        baseStyling,
        datePickerInputStyling,
    ]; }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.#disconnect();
    }
    async firstUpdated() {
        super.firstUpdated();
        const input = await this.$input;
        if (input) {
            const onBodyKeyup = async (ev) => {
                if (this._disabled)
                    return;
                if (ev.key === keyEscape) {
                    this.closePicker();
                }
                else if (ev.key === keyTab) {
                    const inputSurface = await this.$inputSurface;
                    const isTabInsideInputSurface = ev.composedPath().find(n => n.nodeType === Node.ELEMENT_NODE &&
                        n.isEqualNode(inputSurface));
                    if (!isTabInsideInputSurface)
                        this.closePicker();
                }
            };
            const onClick = () => {
                if (this._disabled)
                    return;
                this._open = true;
            };
            const onKeyup = (ev) => {
                if (this._disabled)
                    return;
                if ([keySpace, keyEnter].some(n => n === ev.key)) {
                    onClick();
                }
            };
            document.body.addEventListener('keyup', onBodyKeyup);
            input.addEventListener('keyup', onKeyup);
            input.addEventListener('click', onClick);
            this.#disconnect = () => {
                document.body.removeEventListener('keyup', onBodyKeyup);
                input.removeEventListener('keyup', onKeyup);
                input.removeEventListener('click', onClick);
            };
        }
        await this.outlineElement?.updateComplete;
        await this.layout();
    }
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        if (changedProperties.has('locale')) {
            this.locale = (this.locale || DateTimeFormat().resolvedOptions().locale);
            this.#valueFormatter = this.$toValueFormatter();
            this.#updateValues(this.value);
        }
        if (changedProperties.has('value')) {
            this.#updateValues(this.value);
        }
        if (changedProperties.has('disabled') || changedProperties.has('readOnly')) {
            this._disabled = this.disabled || this.readOnly;
        }
    }
    async updated() {
        if (this._open && this._lazyLoaded) {
            const picker = await this.$picker;
            picker?.queryAll?.(appIconButtonName).forEach(n => n.layout());
        }
    }
    render() {
        const { _lazyLoaded, _open, } = this;
        if (!_lazyLoaded && _open)
            this.#lazyLoad();
        return html `
    ${super.render()}
    ${_lazyLoaded ? this.$renderContent() : nothing}
    `;
    }
    closePicker() {
        this._open = false;
    }
    reset() {
        if (this._disabled)
            return;
        this.#valueAsDate = undefined;
        this.value = '';
    }
    showPicker() {
        if (this._disabled)
            return;
        this._open = true;
    }
    renderInput(shouldRenderHelperText) {
        const { autocapitalize, disabled, focused, helperPersistent, inputMode, isUiValid, label, name, placeholder, required, validationMessage, } = this;
        const autocapitalizeOrUndef = autocapitalize ?
            autocapitalize :
            undefined;
        const showValidationMessage = validationMessage && !isUiValid;
        const ariaLabelledbyOrUndef = label ? 'label' : undefined;
        const ariaControlsOrUndef = shouldRenderHelperText ? 'helper-text' : undefined;
        const ariaDescribedbyOrUndef = focused || helperPersistent || showValidationMessage ?
            'helper-text' :
            undefined;
        const valueText = this.#valueAsDate ? this.#valueFormatter.format(this.#valueAsDate) : '';
        return html `
      <input
          ?disabled=${disabled}
          ?required=${required}
          .value=${valueText}
          @blur=${this.onInputBlur}
          @focus=${this.onInputFocus}
          aria-controls=${ifDefined(ariaControlsOrUndef)}
          aria-describedby=${ifDefined(ariaDescribedbyOrUndef)}
          aria-labelledby=${ifDefined(ariaLabelledbyOrUndef)}
          autocapitalize=${ifDefined(autocapitalizeOrUndef)}
          class=mdc-text-field__input
          inputmode=${ifDefined(inputMode)}
          name=${ifDefined(name || undefined)}
          placeholder=${ifDefined(placeholder)}
          readonly
          type=text
      >`;
    }
    renderTrailingIcon() {
        return html `
    <app-icon-button
      .disabled=${this._disabled}
      @click=${this.#onResetClick}
      aria-label=${this.clearLabel}
      class="mdc-text-field__icon mdc-text-field__icon--trailing"
    >
      ${iconClear}
    </app-icon-button>
    `;
    }
    $renderContent() {
        warnUndefinedElement(appDatePickerInputSurfaceName);
        return html `
    <app-date-picker-input-surface
      @opened=${this.#onOpened}
      ?open=${this._open}
      ?stayOpenOnBodyClick=${true}
      .anchor=${this}
      @closed=${this.#onClosed}
    >${this._open ? this.$renderSlot() : nothing}</app-date-picker-input-surface>
    `;
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
            onDatePickerDateUpdated: this.#onDatePickerDateUpdated,
            onDatePickerFirstUpdated: this.#onDatePickerFirstUpdated,
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
    $toValueFormatter() {
        return DateTimeFormat(this.locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }
    #lazyLoad;
    #onResetClick;
    #onClosed;
    #onDatePickerDateUpdated;
    #onDatePickerFirstUpdated;
    #onOpened;
    #updateValues;
}
__decorate([
    property({ type: String })
], DatePickerInput.prototype, "clearLabel", void 0);
__decorate([
    queryAsync('.mdc-text-field__input')
], DatePickerInput.prototype, "$input", void 0);
__decorate([
    queryAsync(appDatePickerInputSurfaceName)
], DatePickerInput.prototype, "$inputSurface", void 0);
__decorate([
    queryAsync(appDatePickerName)
], DatePickerInput.prototype, "$picker", void 0);
__decorate([
    state()
], DatePickerInput.prototype, "_disabled", void 0);
__decorate([
    state()
], DatePickerInput.prototype, "_lazyLoaded", void 0);
__decorate([
    state()
], DatePickerInput.prototype, "_open", void 0);
