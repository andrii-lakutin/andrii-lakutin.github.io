import '../icon-button/app-icon-button.js';
import { TextField } from '@material/mwc-textfield';
import type { TemplateResult } from 'lit';
import type { AppDatePicker } from '../date-picker/app-date-picker.js';
import type { AppDatePickerInputSurface } from '../date-picker-input-surface/app-date-picker-input-surface.js';
import type { ChangedProperties } from '../typings.js';
import type { DatePickerInputProperties } from './typings.js';
declare const DatePickerInput_base: import("../mixins/typings.js").MixinReturnType<import("../mixins/typings.js").MixinReturnType<import("../mixins/typings.js").MixinReturnType<typeof TextField, import("../mixins/typings.js").DatePickerMinMaxProperties>, import("../mixins/typings.js").DatePickerMixinProperties>, import("../mixins/typings.js").ElementMixinProperties>;
export declare class DatePickerInput extends DatePickerInput_base implements DatePickerInputProperties {
    #private;
    iconTrailing: string;
    type: import("@material/mwc-textfield").TextFieldType;
    get valueAsDate(): Date | null;
    get valueAsNumber(): number;
    clearLabel: "Clear";
    protected $input: Promise<HTMLInputElement | null>;
    protected $inputSurface: Promise<AppDatePickerInputSurface | null>;
    protected $picker: Promise<AppDatePicker | null>;
    private _disabled;
    private _lazyLoaded;
    private _open;
    static styles: import("lit").CSSResult[];
    disconnectedCallback(): void;
    firstUpdated(): Promise<void>;
    willUpdate(changedProperties: ChangedProperties<DatePickerInputProperties>): void;
    updated(): Promise<void>;
    render(): TemplateResult;
    closePicker(): void;
    reset(): void;
    showPicker(): void;
    protected renderInput(shouldRenderHelperText: boolean): TemplateResult;
    protected renderTrailingIcon(): TemplateResult;
    protected $renderContent(): TemplateResult;
    protected $renderSlot(): TemplateResult;
    protected $toValueFormatter(): Intl.DateTimeFormat;
}
export {};
//# sourceMappingURL=date-picker-input.d.ts.map