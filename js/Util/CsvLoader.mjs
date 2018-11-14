"use strict";

import { ILoader } from "./Loader.mjs";

export class CsvLoader extends ILoader {
    constructor() {
        super();
    }

    // noinspection JSMethodCanBeStatic
    async load( csvPath ) {
        const response = await fetch( csvPath );
        if ( !response.ok ) {
            return null;
        }
        const csv = await response.text();
        return csv.split( /\r?\n/ )
            .map( x => x
                .split( "," )
                .map( x => x.trim() )
            );
    }
}
