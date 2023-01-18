import { __decorate } from "tslib";
import { customElement } from 'lit/decorators.js';
import { appIconButtonName } from './constants.js';
import { IconButton } from './icon-button.js';
let AppIconButton = class AppIconButton extends IconButton {
};
AppIconButton = __decorate([
    customElement(appIconButtonName)
], AppIconButton);
export { AppIconButton };
