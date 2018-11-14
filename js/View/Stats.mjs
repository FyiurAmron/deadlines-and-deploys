"use strict";

import { MiscUtils } from "../Util/MiscUtils.mjs";

export class Stats {
    constructor( statsDom ) {
        this.statsDom = statsDom;
    }

    update( hero ) {
        MiscUtils.domClear( this.statsDom );

        if ( hero === null ) {
            return;
        }

        Object.entries( hero ).forEach(
            ( [k, v] ) => {
                const text = document.createTextNode( k.toUpperCase() + ": " + v );
                const p = document.createElement( "P" );
                p.appendChild( text );
                this.statsDom.appendChild( p );
            }
        );
    }
}