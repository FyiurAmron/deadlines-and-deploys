export class Actor {
    constructor( proto ) {
        const p = proto.slice().reverse();

        this.name = p.pop();
        this.hp = p.pop();
        this.mp = p.pop();
        this.xp = p.pop();
        this.gold = p.pop();
        this.strength = p.pop();
        this.dexterity = p.pop();
        this.agility = p.pop();
        this.endurance = p.pop();
        this.wisdom = p.pop();
        this.intelligence = p.pop();
    }

    test() {
        //this.
    }

}
