"use strict";

export class ArrayDataSource {
    constructor( array ) {
        this.array = array.slice().reverse();
    }

    fetchString() {
        return "" + this.array.pop();
    }

    fetchDouble() {
        return parseDouble( this.array.pop() );
    }

    fetchInt() {
        return parseInt( this.array.pop() );
    }
}