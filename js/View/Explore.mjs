"use strict";

import { MiscUtils } from "../Util/MiscUtils.mjs";
import { POSSIBLE_DIRS } from "../const.mjs";

export class Explore {
    static show( dom, callback ) {
        MiscUtils.domClear( dom );

        const p = document.createElement( "P" );
        p.innerText = "Choose direction:";
        dom.appendChild( p );

        const keyMap = new Map();
        POSSIBLE_DIRS.forEach( x => {
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
                window.onkeyup = null;
                listener( evt );
            }
        }
    }
}
