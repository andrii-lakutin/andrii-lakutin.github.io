import '../icon-button/app-icon-button.js';
import '../month-calendar/app-month-calendar.js';
import '../year-grid/app-year-grid.js';
import type { TemplateResult } from 'lit';
import { RootElement } from '../root-element/root-element.js';
import type { DatePickerProperties } from '../typings.js';
import type { DatePickerChangedProperties } from './typings.js';
declare const DatePicker_base: import("../mixins/typings.js").MixinReturnType<import("../mixins/typings.js").MixinReturnType<typeof RootElement, import("../mixins/typings.js").DatePickerMinMaxProperties>, import("../mixins/typings.js").DatePickerMixinProperties>;
export declare class DatePicker extends DatePicker_base implements DatePickerProperties {
    #private;
    get valueAsDate(): Date;
    get valueAsNumber(): number;
    private readonly _monthCalendar;
    private readonly _navigationPrevious;
    private readonly _navigationNext;
    private readonly _yearDropdown;
    private readonly _yearGrid;
    private _currentDate;
    private _max;
    private _min;
    private _selectedDate;
    static styles: import("lit").CSSResult[];
    constructor();
    willUpdate(changedProperties: DatePickerChangedProperties): void;
    protected firstUpdated(): Promise<void>;
    protected updated(changedProperties: DatePickerChangedProperties): Promise<void>;
    protected render(): TemplateResult;
}
export {};
//# sourceMappingURL=date-picker.d.ts.map