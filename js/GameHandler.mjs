"use strict";

import { RaceSelection as RaceSelectionView } from "./View/RaceSelection.mjs";
import { Stats as StatsView } from "./View/Stats.mjs";
import { APP_NAME } from "./const.mjs";

export class GameHandler {
    constructor( viewHandler, gameData ) {
        this.viewHandler = viewHandler;
        this.gameData = gameData;
        this.state = undefined;
        this.hero = undefined;

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
            case "preparing":
                break;
            case "exploring":
                break;
            case "fighting":
                break;
            case "dead":
                break;
        }
    }
    */
    update() {
        this.stats.update( this.hero );
    }
}
