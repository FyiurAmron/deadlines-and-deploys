import { MiscUtils } from "../Util/MiscUtils.mjs";

export class RaceSelection {
    static show( dom, availableRaces ) {
        MiscUtils.domClear( dom );

        availableRaces.forEach( x => {
            const btn = document.createElement( "BUTTON" );
            btn.innerText = x;
            btn.addEventListener( "click", evt => {
                console.log( x )
            } );
            dom.appendChild( btn );
        } );
    }
}