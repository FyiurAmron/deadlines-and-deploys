"use script";

import { MiscUtils } from "../Util/MiscUtils.mjs";

export class DeadHero {
    static show( dom, callback ) {
        MiscUtils.domClear( dom );

        const btn = document.createElement( "A" );
        btn.href = "#";
        btn.style.display = "block";
        btn.innerText = "Restart?";
        btn.addEventListener( "click", evt => {
            callback( evt );
        } );
        dom.appendChild( btn );
    }
}