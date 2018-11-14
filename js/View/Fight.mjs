"use strict";

import { MiscUtils } from "../Util/MiscUtils.mjs";
import { POSSIBLE_COMBAT_ACTIONS } from "../const.mjs";

export class Fight {
    static show( dom, callback ) {
        MiscUtils.domClear( dom );

        const p = document.createElement( "P" );
        p.innerText = "Choose action:";
        dom.appendChild( p );

        POSSIBLE_COMBAT_ACTIONS.forEach( x => {
            const btn = document.createElement( "A" );
            btn.href = "#";
            btn.style.display = "block";
            btn.innerText = x;
            btn.addEventListener( "click", evt => {
                callback( x, evt );
            } );
            dom.appendChild( btn );
        } );
    }
}