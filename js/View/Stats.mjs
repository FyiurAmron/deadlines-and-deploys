import { MiscUtils } from "../Util/MiscUtils.mjs";

export class Stats {
    static update( statsDom, hero ) {
        MiscUtils.domClear( statsDom );
        Object.entries( hero ).forEach(
            ( [k, v] ) => {
                const text = document.createTextNode( k.toUpperCase() + ": " + v );
                const p = document.createElement( "P" );
                p.appendChild( text );
                statsDom.appendChild( p );
            }
        );
    }
}