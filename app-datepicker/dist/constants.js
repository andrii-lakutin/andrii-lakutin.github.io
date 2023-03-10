import { toResolvedDate } from './helpers/to-resolved-date.js';
import { keyArrowDown, keyArrowLeft, keyArrowRight, keyArrowUp, keyEnd, keyEnter, keyHome, keyPageDown, keyPageUp, keySpace } from './key-values.js';
export const confirmKeySet = new Set([keyEnter, keySpace]);
export const DateTimeFormat = Intl.DateTimeFormat;
export const labelChooseMonth = 'Choose month';
export const labelChooseYear = 'Choose year';
export const labelNextMonth = 'Next month';
export const labelPreviousMonth = 'Previous month';
export const labelSelectedDate = 'Selected date';
export const labelSelectedYear = 'Selected year';
export const labelShortWeek = 'Wk';
export const labelToday = 'Today';
export const labelToyear = 'Toyear';
export const labelWeek = 'Week';
export const MAX_DATE = toResolvedDate('2100-12-31');
export const navigationKeyListNext = [keyArrowDown, keyPageDown, keyEnd];
export const navigationKeyListPrevious = [keyArrowUp, keyPageUp, keyHome];
export const navigationKeySetDayNext = new Set([...navigationKeyListNext, keyArrowRight]);
export const navigationKeySetDayPrevious = new Set([...navigationKeyListPrevious, keyArrowLeft]);
export const navigationKeySetGrid = new Set([...navigationKeySetDayNext, ...navigationKeySetDayPrevious]);
export const startViews = ['calendar', 'yearGrid'];
export const weekNumberTemplate = 'Week %s';
