import { IconButton as BaseIconButton } from '@material/mwc-icon-button';
export class IconButton extends BaseIconButton {
    async layout() {
        const ripple = await this.ripple;
        ripple?.['mdcFoundation']?.layout();
        await ripple?.updateComplete;
        await this.updateComplete;
    }
}
