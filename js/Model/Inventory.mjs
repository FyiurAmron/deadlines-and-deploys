export class Inventory {
    constructor() {
        //this.head = undefined;
        // this.cape = undefined;
        // this.ring = undefined;
        this.armor = undefined;
        this.weapon = undefined;
        //this.weapon = undefined;
    }

    set( slot, item ) {
        this[slot] = item;
    }
}
