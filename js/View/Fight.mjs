'use strict';

import { MiscUtils } from '../Util/MiscUtils.mjs';
import { POSSIBLE_COMBAT_ACTIONS } from '../const.mjs';

export class Fight {
    static show( dom, callback ) {
        MiscUtils.showMenu( dom, POSSIBLE_COMBAT_ACTIONS, 'Choose action:', callback );
    }
}