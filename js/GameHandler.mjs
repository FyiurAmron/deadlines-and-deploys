"use strict";

import { APP_NAME } from "./const.mjs";
import {
    ACTION_ATTACK,
    ACTION_ESCAPE,
    ACTION_LOOT,
    ACTION_IGNORE_LOOT,
} from "./const.mjs";

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
        this.hero.gold = 0;
        this.room = this.createRandomRoom();
        MiscUtils.domClear( this.viewHandler.ctrlDom );

        this.message = "You feel invigorated.";

        this.explore();
    }

    explore( direction ) {
        this.setState( "exploring" );
        this.enemy = null;
        ExploreViewController.show( this.viewHandler.ctrlDom, x => {
            this.room = this.createRandomRoom();

            if ( Math.random() < 0.4 ) {
                this.combat();
                return;
            }

            this.message = "You went " + x + ".";
            this.explore( x );
        } );
        this.update();
    }

    combat() {
        this.setState( "combat" );

        this.enemy = this.createRandomEnemy();

        //this.viewHandler.setEnemyMessage( this.enemy );

        FightViewController.show(
            this.viewHandler.ctrlDom,
            x => {
                switch ( x ) {
                    case ACTION_ATTACK:
                        this.attack();
                        if ( this.enemy.hp <= 0 ) {
                            window.onkeyup = null;
                            this.message = "You have completely defeated the " + this.enemy.name + ".";
                            if ( this.hero.gainXp( this.enemy.xp ) ) {
                                this.message += ".. You gain a level!";
                            }
                            this.enemy.xp = 0;
                            this.loot();
                        } else if ( this.hero.hp <= 0 ) {
                            window.onkeyup = null;
                            this.die( "You're killed, dismembered and eaten by the bloodthirsty " + this.enemy.name + "." );
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
        LootViewController.show(
            this.viewHandler.ctrlDom,
            x => {
                switch ( x ) {
                    case ACTION_LOOT:
                        this.message = "You take " + this.enemy.gold + " gold pieces from the body.";
                        this.hero.gold += this.enemy.gold;
                        this.enemy.gold = 0;
                        this.explore();
                        break;
                    case ACTION_IGNORE_LOOT:
                        this.message = "You leave the loot, wary of the possible traps, curses and dungeon predators.";
                        this.explore();
                        break;
                }
            }
        );
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

        this.viewHandler.setEnemyMessage( this.enemy );
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
