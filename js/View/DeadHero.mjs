'use script';

import { MiscUtils } from '../Util/MiscUtils.mjs';

export class DeadHero {
    static show( dom, callback ) {
        MiscUtils.domClear( dom );

        const btn = document.createElement( 'A' );
        btn.href = '#';
        btn.style.display = 'block';
        btn.innerText = 'Restart?';
        const listener = ( evt => {
            callback( evt ); // note: ATM this is completely redundant!
        } );
        btn.addEventListener( 'click', listener );
        dom.appendChild( btn );

        window.onkeyup = function ( evt ) {
            if ( evt.key === 'r' ) {
                window.onkeyup = null;
                listener( evt );
            }
        };
    }
}