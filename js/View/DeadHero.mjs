'use script';

import { MiscUtils } from '../Util/MiscUtils.mjs';
import { POSSIBLE_DEATH_OPTIONS } from '../const.mjs';

export class DeadHero {
    static show( dom, callback ) {
        MiscUtils.showMenu( dom, POSSIBLE_DEATH_OPTIONS, null, callback );
    }
}