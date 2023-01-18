import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { appYearGridName } from './constants.js';
import { YearGrid } from './year-grid.js';
let AppYearGrid = class AppYearGrid extends YearGrid {
};
AppYearGrid = __decorate([
    customElement(appYearGridName)
], AppYearGrid);
export { AppYearGrid };
