'use strict';

export class ArrayDataSource {
    constructor( array ) {
        this.array = array.slice().reverse();
    }

    fetchString() {
        return '' + this.array.pop();
    }

    fetchFloat() {
        return parseFloat( this.array.pop() );
    }

    fetchInt() {
        return parseInt( this.array.pop() );
    }
}