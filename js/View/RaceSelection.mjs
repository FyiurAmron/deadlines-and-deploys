'use strict';

import { MiscUtils } from '../Util/MiscUtils.mjs';

export class RaceSelection {
    static show( dom, callback, availableRaces ) {
        MiscUtils.showMenu( dom, availableRaces, 'Choose your race:', callback )
    }
}