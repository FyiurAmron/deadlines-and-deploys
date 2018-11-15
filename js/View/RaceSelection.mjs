"use strict";

import { MiscUtils } from "../Util/MiscUtils.mjs";

export class RaceSelection {
    static show( dom, availableRaces, callback ) {
        MiscUtils.domClear( dom );

        const p = document.createElement( "P" );
        p.innerText = "Choose your race:";
        dom.appendChild( p );

        const keyMap = new Map();
        availableRaces.forEach( x => {
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