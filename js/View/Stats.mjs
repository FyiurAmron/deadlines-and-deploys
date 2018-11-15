"use strict";

import { MiscUtils } from "../Util/MiscUtils.mjs";

export class Stats {
    constructor( statsDom ) {
        this.statsDom = statsDom;
    }

    hide() {
        MiscUtils.domClear( this.statsDom );
    }

    update( hero ) {
        MiscUtils.domClear( this.statsDom );

        if ( hero === null ) {
            return;
        }

        Object.entries( hero ).forEach(
            ( [k, v] ) => {
                if ( k === "frequency" ) {
                    return;
                }
                const text = document.createTextNode( k.toUpperCase() + ": " + v );
                const p = document.createElement( "P" );
                p.appendChild( text );
                this.statsDom.appendChild( p );
            }
        );
    }
}