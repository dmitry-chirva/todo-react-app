import {StatusNames} from "../enum/status-names.enum";

export const StatusFilter = Object.freeze({
    [StatusNames.ALL]: undefined,
    [StatusNames.ACTIVE]: false,
    [StatusNames.COMPLETED]: true
})