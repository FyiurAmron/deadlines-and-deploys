"use strict";

import { MiscUtils } from "../Util/MiscUtils.mjs";
import { Stats } from "./Stats.mjs";

export class RaceSelection {
    static show( statsDom, availableRaces, callback ) {
        MiscUtils.domClear( statsDom );

        availableRaces.forEach( x => {
            const btn = document.createElement( "A" );
            btn.href = "#";
            btn.style.display = "block";
            btn.innerText = x;
            btn.addEventListener( "click", evt => {
                callback( x, evt );
            } );
            statsDom.appendChild( btn );
        } );
    }
}