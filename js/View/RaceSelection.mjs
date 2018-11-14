"use strict";

import { MiscUtils } from "../Util/MiscUtils.mjs";

export class RaceSelection {
    static show( dom, availableRaces, callback ) {
        MiscUtils.domClear( dom );

        const p = document.createElement( "P" );
        p.innerText = "Choose your race:";
        dom.appendChild( p );

        availableRaces.forEach( x => {
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