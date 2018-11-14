"use strict";

import { APP_NAME } from "./const.mjs";

import { MiscUtils } from "./Util/MiscUtils.mjs";

import { Stats as StatsView } from "./View/Stats.mjs";

import { RaceSelection as RaceSelectionViewController } from "./View/RaceSelection.mjs";
import { DeadHero as DeadHeroViewController } from "./View/DeadHero.mjs";
import { Explore as ExploreViewController } from "./View/Explore.mjs";

import { Room as RoomModel } from "./Model/Room.mjs";
import { Actor as ActorModel } from "./Model/Actor.mjs";

export class GameHandler {
    constructor( viewHandler, gameData ) {
        this.viewHandler = viewHandler;
        this.gameData = gameData;
        this.state = null;
        this.hero = null;
        this.room = null;

        this.stats = new StatsView( this.viewHandler.statsDom );
    }

    preGame() {
        RaceSelectionViewController.show(
            this.viewHandler.ctrlView,
            this.gameData.playableRaces,
            this.startGame.bind( this )
        );
    }

    createRandomRoom() {
        return new RoomModel( MiscUtils.randomElement( this.gameData.locations ) );
    }

    startGame( heroProto ) {
        this.hero = new ActorModel( this.gameData.actorProtos.get( heroProto ) );
        this.hero.xp = 0;
        this.room = this.createRandomRoom();
        this.setState( "exploring" );
        MiscUtils.domClear( this.viewHandler.ctrlView );
        this.update();
        this.explore();
    }

    explore() {
        ExploreViewController.show( this.viewHandler.ctrlView, x => {
            this.room = this.createRandomRoom();
            this.update();
        } );
    }

    die() {
        this.state = "dead";

        this.viewHandler.setMainViewContent( "You are dead." );

        DeadHeroViewController.show(
            this.viewHandler.ctrlView,
            this.preGame().bind( this )
        );
    }


    async init() {
        await this.gameData.init();

        this.viewHandler.hidePreloader();

        this.setState( "preparing" );

        this.preGame();
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
        switch ( this.state ) {
            case "exploring":

                break;
        }
    }
}
