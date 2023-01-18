import type { TemplateResult } from 'lit';
import { nothing } from 'lit';
import { RootElement } from '../root-element/root-element.js';
import type { MonthCalendarData, MonthCalendarProperties, MonthCalendarRenderCalendarDayInit } from './typings.js';
export declare class MonthCalendar extends RootElement implements MonthCalendarProperties {
    #private;
    data?: MonthCalendarData;
    selectedCalendarDay: Promise<HTMLTableCellElement | null>;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode | undefined;
        customElements?: CustomElementRegistry | undefined;
    };
    static styles: import("lit").CSSResult[];
    constructor();
    protected shouldUpdate(): boolean;
    protected updated(): Promise<void>;
    protected render(): TemplateResult | typeof nothing;
    protected $renderCalendarDay({ ariaDisabled, ariaLabel, ariaSelected, className, day, fullDate, part, tabIndex, title, }: MonthCalendarRenderCalendarDayInit): TemplateResult;
}
declare global {
    interface HTMLTableCellElement {
        day: string;
        fullDate: Date;
    }
}
//# sourceMappingURL=month-calendar.d.ts.map