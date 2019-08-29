'use strict';

import { MiscUtils } from '../Util/MiscUtils.mjs';
import { POSSIBLE_DIRS } from '../const.mjs';

export class Explore {
    static show( dom, callback ) {
        MiscUtils.showMenu( dom, POSSIBLE_DIRS, 'Choose direction:', callback );
    }
}
