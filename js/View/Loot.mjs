'use strict';

import { MiscUtils } from '../Util/MiscUtils.mjs';
import { POSSIBLE_LOOT_ACTIONS } from '../const.mjs';

export class Loot {
    static show( dom, callback ) {
        MiscUtils.showMenu( dom, POSSIBLE_LOOT_ACTIONS, 'Choose action:', callback );
    }
}