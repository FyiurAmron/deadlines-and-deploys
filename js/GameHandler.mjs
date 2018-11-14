"use strict";

import { APP_NAME } from "./const.mjs";
import { ACTION_ATTACK, ACTION_ESCAPE } from "./const.mjs";

import { MiscUtils } from "./Util/MiscUtils.mjs";

import { Stats as StatsView } from "./View/Stats.mjs";

import { RaceSelection as RaceSelectionViewController } from "./View/RaceSelection.mjs";
import { DeadHero as DeadHeroViewController } from "./View/DeadHero.mjs";
import { Explore as ExploreViewController } from "./View/Explore.mjs";
import { Fight as FightViewController } from "./View/Fight.mjs";
import { Loot as LootViewController } from "./View/Loot.mjs";

import { Room as RoomModel } from "./Model/Room.mjs";
import { Actor as ActorModel } from "./Model/Actor.mjs";

export class GameHandler {
    constructor( viewHandler, gameData ) {
        this.viewHandler = viewHandler;
        this.gameData = gameData;

        this.state = null;
        this.hero = null;
        this.room = null;
        this.enemy = null;

        this.message = null;

        this.stats = new StatsView( this.viewHandler.statsDom );
    }

    async init() {
        await this.gameData.init();

        this.viewHandler.hidePreloader();

        this.setState( "preparing" );

        this.preGame();
    }

    preGame() {
        RaceSelectionViewController.show(
            this.viewHandler.ctrlDom,
            this.gameData.playableRaces,
            this.startGame.bind( this )
        );

        this.update();
    }

    startGame( heroProto ) {
        this.hero = new ActorModel( this.gameData.actorProtos.get( heroProto ) );
        this.hero.xp = 0;
        this.room = this.createRandomRoom();
        MiscUtils.domClear( this.viewHandler.ctrlDom );

        this.message = "You feel invigorated.";

        this.explore();
    }

    explore( direction ) {
        this.setState( "exploring" );
        ExploreViewController.show( this.viewHandler.ctrlDom, x => {
            this.room = this.createRandomRoom();

            if ( Math.random() < 0.4 ) {
                this.fight();
                return;
            }

            this.message = "You went " + x + ".";
            this.explore( x );
        } );
        this.update();
    }

    fight() {
        this.setState( "fighting" );

        this.enemy = this.createRandomEnemy();

        this.message = "You see an enemy: " + this.enemy.name + " (" + this.enemy.getHpDescription() + ")";

        FightViewController.show(
            this.viewHandler.ctrlDom,
            x => {
                switch ( x ) {
                    case ACTION_ATTACK:
                        this.attack();
                        if ( this.enemy.hp <= 0 ) {
                            this.message = "You've defeated the " + this.enemy.name + ".";
                            this.loot();
                        } else {
                            this.update();
                        }
                        break;
                    case ACTION_ESCAPE:
                        if ( Math.random() < 0.4 ) {
                            this.message = "You are able to escape successfully.";
                            this.explore();
                        } else {
                            this.die( "You're backstabbed during a failed escape attempt." );
                        }
                        break;
                }
            }
        );

        this.update();
    }

    loot() {
        this.setState( "looting" );
        LootViewController.show( this.enemy );
        this.update();
    }

    die( msg ) {
        if ( this.hero.hp > 0 ) {
            this.hero.hp = 0;
        }

        this.state = "dead";

        this.message = ( msg !== undefined ) ? msg : "You are dead.";
        this.room = new RoomModel( "You see an eerie river with a skeletal boatman." );

        DeadHeroViewController.show(
            this.viewHandler.ctrlDom,
            this.preGame().bind( this )
        );

        this.update();
    }

    setState( state ) {
        this.state = state;
        this.viewHandler.setTitle( APP_NAME + " :: " + state );
    }

    update() {
        this.stats.update( this.hero );

        if ( this.enemy !== null ) {
            this.message = "You see an enemy: " + this.enemy.name + " (" + this.enemy.getHpDescription() + ")";
        }
        this.viewHandler.setMessage( this.message );
        this.viewHandler.setMainViewContent( this.room ? this.room.description : "" );
    }

    createRandomRoom() {
        return new RoomModel( MiscUtils.randomElement( this.gameData.locations ) );
    }

    createRandomEnemy() {
        const protos = this.gameData.actorProtos;
        return new ActorModel( protos.get( MiscUtils.randomElement( [...protos.keys()] ) ) );
    }

    attack() {
        this.enemy.hp -= this.enemy.hpMax / 10;
    }
}
