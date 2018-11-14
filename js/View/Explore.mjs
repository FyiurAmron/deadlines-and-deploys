"use strict";

import { MiscUtils } from "../Util/MiscUtils.mjs";
import { POSSIBLE_DIRS } from "../const.mjs";

export class Explore {
    static show( dom, callback ) {
        MiscUtils.domClear( dom );

        const p = document.createElement( "P" );
        p.innerText = "Choose direction:";
        dom.appendChild( p );

        POSSIBLE_DIRS.forEach( x => {
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
