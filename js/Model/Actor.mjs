"use strict";

import { HP_DESCRIPTIONS } from "../const.mjs";
import { BASE_XP_FOR_LEVEL } from "../const.mjs";

import { ArrayDataSource } from "../Util/ArrayDataSource.mjs";

export class Actor {
    constructor( proto ) {
        const p = new ArrayDataSource( proto );

        this.name = p.fetchString();
        this.level = p.fetchInt();
        this.hpMax = p.fetchInt();
        this.hp = this.hpMax;
        this.mpMax = p.fetchInt();
        this.mp = this.mpMax;
        this.xp = p.fetchInt();
        this.gold = p.fetchInt();
        this.strength = p.fetchInt();
        this.dexterity = p.fetchInt();
        this.agility = p.fetchInt();
        this.endurance = p.fetchInt();
        this.wisdom = p.fetchInt();
        this.intelligence = p.fetchInt();
    }

    getHpDescription() {
        const descScale = HP_DESCRIPTIONS.length - 2;

        const baseRatio = this.hp / this.hpMax;
        const descIndex = ( baseRatio <= 0 )
            ? descScale + 1
            : Math.floor( ( 1.0 - baseRatio ) * descScale + 0.01 );

        return HP_DESCRIPTIONS[descIndex];
    }

    gainXp( amount ) {
        this.xp += amount;

        const xpForNextLevel = this.level * BASE_XP_FOR_LEVEL;

        if ( this.xp < xpForNextLevel ) {
            return false;
        }

        this.xp -= xpForNextLevel;

        this.hpMax += this.level;
        this.mpMax += this.level;
        this.hp += this.level;
        this.mp += this.level;

        this.level++;
        return true;
    }
}
