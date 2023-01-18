import type { TemplateResult } from 'lit';
import { RootElement } from '../root-element/root-element.js';
import type { YearGridChangedProperties, YearGridData, YearGridProperties, YearGridRenderButtonInit } from './typings.js';
export declare class YearGrid extends RootElement implements YearGridProperties {
    #private;
    data: YearGridData;
    selectedYearGridButton: Promise<HTMLButtonElement | null>;
    yearGrid: Promise<HTMLDivElement | null>;
    protected $focusingYear: number;
    static styles: import("lit").CSSResult[];
    constructor();
    protected shouldUpdate(): boolean;
    willUpdate(changedProperties: YearGridChangedProperties): void;
    protected updated(): Promise<void>;
    protected render(): TemplateResult;
    protected $renderButton({ ariaLabel, ariaSelected, className, part, tabIndex, title, year, }: YearGridRenderButtonInit): TemplateResult;
}
//# sourceMappingURL=year-grid.d.ts.map