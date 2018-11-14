"use strict";

import { CsvLoader } from './CsvLoader.mjs';
import { Inventory } from './Inventory.mjs';
import { Actor } from './Actor.mjs';

async function onLoad() {
    //document.getElementById("inv").innerText = 'ZAJ';
    //const inv = new Inventory().name;
    //console.log( inv );
    const actorProtosArr = await CsvLoader.load( "./data/actorProtos.csv" );
    const actorProtos = actorProtosArr.slice( 1 ).map( x => new Actor( x ) );
    //console.log( actorProtosArr );
    //console.log( actorProtos );
}

window.addEventListener( "load", onLoad );
