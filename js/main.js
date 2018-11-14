"use strict";

import { ViewHandler } from "./View/ViewHandler.mjs";
import { GameData } from "./Model/GameData.mjs";
import { CsvLoader } from "./Util/CsvLoader.mjs";

import { GameHandler } from "./GameHandler.mjs";

async function onLoad() {
    const viewData = new ViewHandler( document );
    const gameData = new GameData( new CsvLoader() );
    const gameHandler = new GameHandler( viewData, gameData );

    await gameHandler.init();
}

window.addEventListener( "load", onLoad );
