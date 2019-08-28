'use strict';

export class MiscUtils {
    static domClear( dom ) {
        while ( dom.firstChild !== null ) {
            dom.firstChild.remove();
        }
    }

    static randomElement( array ) {
        return array[Math.floor( Math.random() * array.length )];
    }
}