"use strict";

import { MiscUtils } from "../Util/MiscUtils.mjs";
import { POSSIBLE_COMBAT_ACTIONS } from "../const.mjs";

export class Fight {
    static show( dom, callback ) {
        MiscUtils.domClear( dom );

        const p = document.createElement( "P" );
        p.innerText = "Choose action:";
        dom.appendChild( p );

        const keyMap = new Map();
        POSSIBLE_COMBAT_ACTIONS.forEach( x => {
            const btn = document.createElement( "A" );
            btn.href = "#";
            btn.style.display = "block";
            btn.innerText = x;
            const listener = ( evt => {
                callback( x, evt );
            } );
            btn.addEventListener( "click", listener );
            keyMap.set( x.charAt( 0 ).toLowerCase(), listener );
            dom.appendChild( btn );
        } );

        window.onkeyup = function ( evt ) {
            const listener = keyMap.get( evt.key );

            if ( listener !== undefined ) {
                //window.onkeyup = null;
                listener( evt );
            }
        }
    }
}