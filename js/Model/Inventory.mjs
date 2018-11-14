export class Inventory {
    constructor() {
        //this.head = null;
        // this.cape = null;
        // this.ring = null;
        this.armor = null;
        this.weapon = null;
        //this.weapon = null;
    }

    set( slot, item ) {
        this[slot] = item;
    }
}
