"use strict";

export class MiscUtils {
    static domClear( dom ) {
        while ( dom.firstChild ) {
            dom.firstChild.remove();
        }
    }
}