"use strict";

import { CsvLoader } from "./Util/CsvLoader.mjs";
import { Inventory } from "./Model/Inventory.mjs";
import { Actor } from "./Model/Actor.mjs";
import { RaceSelection } from "./View/RaceSelection.mjs";
import { MiscUtils } from "./Util/MiscUtils.mjs";

async function onLoad() {
    const statsDom = document.getElementById( "status" );
    const invDom = document.getElementById( "inv" );
    const viewDom = document.getElementById( "view" );
    const ctrlView = document.getElementById( "ctrl" );

    const contentElems = [invDom, viewDom, ctrlView];

    contentElems.forEach( x => MiscUtils.domClear( x ) );

    //const inv = new Inventory().name;
    const actorProtosRaw = await CsvLoader.load( "./data/actorProtos.csv" );
    const playableRacesRaw = await CsvLoader.load( "./data/playableRaces.csv" );

    const actorProtos = actorProtosRaw.slice( 1 )
        .reduce(
            ( map, x ) => map.set( x[0], new Actor( x ) ),
            new Map()
        );
    const playableRaces = playableRacesRaw.map( x => x[0] );

    var hero = undefined;

    RaceSelection.show( statsDom, playableRaces, x => ( hero = actorProtos.get( x ) ) );

    document.getElementById( "loader" ).style.display = "none";
    document.getElementById( "content" ).style.display = "block";
}

window.addEventListener( "load", onLoad );
