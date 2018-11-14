"use strict";

import { APP_NAME } from "./const.mjs";
import { RaceSelection as RaceSelectionView } from "./View/RaceSelection.mjs";
import { Stats as StatsView } from "./View/Stats.mjs";
import { MiscUtils } from "./Util/MiscUtils.mjs";
import { Room } from "./Model/Room.mjs";

export class GameHandler {
    constructor( viewHandler, gameData ) {
        this.viewHandler = viewHandler;
        this.gameData = gameData;
        this.state = undefined;
        this.hero = undefined;
        this.room = undefined;

        this.stats = new StatsView( this.viewHandler.statsDom );
    }

    async init() {
        await this.gameData.init();

        this.viewHandler.hidePreloader();

        this.setState( "preparing" );

        RaceSelectionView.show(
            this.viewHandler.statsDom,
            this.gameData.playableRaces,
            x => {
                this.hero = this.gameData.actorProtos.get( x );
                this.room = new Room( MiscUtils.randomElement( this.gameData.locations ) );
                this.setState( "exploring" );
                this.update();
            }
        );

    }

    setState( state ) {
        this.state = state;
        this.viewHandler.setTitle( APP_NAME + " :: " + state );
    }

    /*
    static update( ctrlDom, state ) {

        switch ( state ) {
            case "fighting":
                break;
            case "dead":
                break;
        }
    }
    */
    update() {
        this.stats.update( this.hero );
        this.viewHandler.setMainViewContent( this.room.description );
    }
}
