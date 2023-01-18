import '@material/mwc-button';
import '@material/mwc-dialog';
import '../date-picker/app-date-picker.js';
import './app-date-picker-dialog-base.js';
import type { TemplateResult } from 'lit';
import { RootElement } from '../root-element/root-element.js';
import type { CustomEventDetail } from '../typings.js';
import type { DatePickerDialogChangedProperties, DatePickerDialogProperties } from './typings.js';
declare const DatePickerDialog_base: import("../mixins/typings.js").MixinReturnType<import("../mixins/typings.js").MixinReturnType<typeof RootElement, import("../mixins/typings.js").DatePickerMinMaxProperties>, import("../mixins/typings.js").DatePickerMixinProperties>;
export declare class DatePickerDialog extends DatePickerDialog_base implements DatePickerDialogProperties {
    #private;
    get valueAsDate(): Date;
    get valueAsNumber(): number;
    confirmLabel: string;
    dismissLabel: string;
    open: boolean;
    resetLabel: string;
    private _datePicker;
    private _rendered;
    static styles: import("lit").CSSResult[];
    constructor();
    protected willUpdate(changedProperties: DatePickerDialogChangedProperties): void;
    protected updated(changedProperties: DatePickerDialogChangedProperties): void;
    protected render(): TemplateResult;
    hide(): void;
    show(): void;
    protected $onDatePickerDateUpdated({ detail: { valueAsDate, }, }: CustomEvent<CustomEventDetail['date-updated']['detail']>): void;
    protected $onDatePickerFirstUpdated({ detail: { valueAsDate, }, }: CustomEvent<CustomEventDetail['first-updated']['detail']>): void;
    protected $renderSlot(): TemplateResult;
}
export {};
//# sourceMappingURL=date-picker-dialog.d.ts.map