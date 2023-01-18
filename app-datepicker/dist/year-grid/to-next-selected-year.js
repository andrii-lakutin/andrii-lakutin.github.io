import { clampValue } from '../helpers/clamp-value.js';
import { keyArrowDown, keyArrowLeft, keyArrowRight, keyArrowUp, keyEnd, keyHome } from '../key-values.js';
export function toNextSelectedYear({ key, max, min, year, }) {
    let newYear = year;
    switch (key) {
        case keyArrowUp: {
            newYear = year - 4;
            break;
        }
        case keyArrowDown: {
            newYear = year + 4;
            break;
        }
        case keyArrowLeft: {
            newYear = year - 1;
            break;
        }
        case keyArrowRight: {
            newYear = year + 1;
            break;
        }
        case keyEnd: return max.getUTCFullYear();
        case keyHome: return min.getUTCFullYear();
        default:
            return year;
    }
    return clampValue(min.getUTCFullYear(), max.getFullYear(), newYear);
}
