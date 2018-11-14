"use strict";

import { CsvLoader } from './Util/CsvLoader.mjs';
import { Inventory } from './Model/Inventory.mjs';
import { Actor } from './Model/Actor.mjs';

async function onLoad() {
    const invDom = document.getElementById( "inv" );
    const viewDom = document.getElementById( "view" );
    const ctrlView = document.getElementById( "ctrl" );

    //const inv = new Inventory().name;
    const actorProtosArr = await CsvLoader.load( "./data/actorProtos.csv" );
    const playableRaces = await CsvLoader.load( "./data/playableRaces.csv" );
    console.log( playableRaces );
    const actorProtos = actorProtosArr.slice( 1 )
        .reduce(
            ( map, x ) => map.set( x[0], new Actor( x ) ),
            new Map()
        );

    console.log( actorProtos );
}

window.addEventListener( "load", onLoad );
