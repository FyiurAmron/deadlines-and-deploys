"use strict";

import { MiscUtils } from "../Util/MiscUtils.mjs";

export class ViewHandler {
    constructor( doc ) {
        this.doc = doc;

        this.statsDom = doc.getElementById( "status" );
        this.invDom = doc.getElementById( "inv" );
        this.viewDom = doc.getElementById( "view" );
        this.ctrlView = doc.getElementById( "ctrl" );

        this.loader = doc.getElementById( "loader" );
        this.content = doc.getElementById( "content" );

        [this.statsDom, this.invDom, this.viewDom, this.ctrlView].forEach( x => MiscUtils.domClear( x ) );
    }

    hidePreloader() {
        this.loader.style.display = "none";
        this.content.style.display = "block";
    }

    setTitle( title ) {
        this.doc.title = title;
    }
}