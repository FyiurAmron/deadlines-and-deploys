'use strict';

import { MiscUtils } from '../Util/MiscUtils.mjs';

export class Stats {
    constructor( statsDom ) {
        this.statsDom = statsDom;
    }

    addStatBox( text ) {
        const textNode = document.createTextNode( text );
        const p = document.createElement( 'P' );
        p.appendChild( textNode );
        this.statsDom.appendChild( p );
    }

    hide() {
        MiscUtils.domClear( this.statsDom );
    }

    /**
     * @param {Actor} hero
     */
    update( hero ) {
        MiscUtils.domClear( this.statsDom );

        if ( hero === null ) {
            return;
        }

        const statBoxes = [
            'Name: ' + hero.name,
            'HP: ' + hero.hp + '/' + hero.hpMax,
            'MP: ' + hero.mp + '/' + hero.mpMax,
            '$$: ' + hero.gold,
            'Str: ' + hero.strength,
            'Dex: ' + hero.dexterity,
            'Agi: ' + hero.agility,
            'End: ' + hero.endurance,
            'Wis: ' + hero.wisdom,
            'Int: ' + hero.intelligence,
        ];

        for ( const statBox of statBoxes ) {
            this.addStatBox( statBox );
        }
    }
}
