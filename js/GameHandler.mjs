'use strict';

import {
    APP_NAME,
    ACTION_ATTACK,
    ACTION_ESCAPE,
    ACTION_LOOT,
    ACTION_IGNORE_LOOT,
    COMBAT_ROOM_CHANCE,
} from './const.mjs';

import { MiscUtils } from './Util/MiscUtils.mjs';

import { Stats as StatsView } from './View/Stats.mjs';

import { RaceSelection as RaceSelectionViewController } from './View/RaceSelection.mjs';
import { DeadHero as DeadHeroViewController } from './View/DeadHero.mjs';
import { Explore as ExploreViewController } from './View/Explore.mjs';
import { Fight as FightViewController } from './View/Fight.mjs';
import { Loot as LootViewController } from './View/Loot.mjs';

import { Room as RoomModel } from './Model/Room.mjs';
import { Actor as ActorModel } from './Model/Actor.mjs';

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

        this.setState( 'preparing' );

        this.preGame();
    }

    preGame() {
        this.room = null;
        this.message = null;
        this.hero = null;
        this.stats.hide();

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

        this.message = 'You feel invigorated.';

        this.explore();
    }

    explore( direction ) {
        this.setState( 'exploring' );
        this.enemy = null;
        ExploreViewController.show( this.viewHandler.ctrlDom, x => {
            this.room = this.createRandomRoom();

            if ( Math.random() < COMBAT_ROOM_CHANCE ) {
                if ( this.combat() ) {
                    return;
                }
            }

            this.message = 'You went ' + x + '.';
            this.explore( x );
        } );
        this.update();
    }

    combat() {
        this.enemy = this.createRandomEnemy();

        if ( this.enemy === null ) {
            return false;
        }

        this.setState( 'combat' );

        //this.viewHandler.setEnemyMessage( this.enemy );

        FightViewController.show(
            this.viewHandler.ctrlDom,
            x => {
                switch ( x ) {
                    case ACTION_ATTACK:
                        this.attack();
                        if ( this.enemy.hp <= 0 ) {
                            window.onkeyup = null;
                            this.message = 'You have completely defeated the ' + this.enemy.name + '.';
                            if ( this.hero.gainXp( this.enemy.xp ) ) {
                                this.message += '.. You gain a level!';
                            }
                            this.enemy.xp = 0;
                            this.loot();
                        } else if ( this.hero.hp <= 0 ) {
                            window.onkeyup = null;
                            this.die( 'You\'re killed, dismembered and eaten by the bloodthirsty ' + this.enemy.name + '.' );
                        } else {
                            this.update();
                        }
                        break;
                    case ACTION_ESCAPE:
                        if ( Math.random() < 0.4 ) {
                            this.message = 'You are able to escape successfully.';
                            this.explore();
                        } else {
                            this.die( 'You\'re backstabbed during a failed escape attempt.' );
                        }
                        break;
                }
            }
        );

        this.update();

        return true;
    }

    loot() {
        this.setState( 'looting' );
        LootViewController.show(
            this.viewHandler.ctrlDom,
            x => {
                switch ( x ) {
                    case ACTION_LOOT:
                        this.message = 'You take ' + this.enemy.gold + ' gold pieces from the body.';
                        this.hero.gold += this.enemy.gold;
                        this.enemy.gold = 0;
                        this.explore();
                        break;
                    case ACTION_IGNORE_LOOT:
                        this.message = 'You leave the loot, wary of the possible traps, curses and dungeon predators.';
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

        this.state = 'dead';

        this.message = ( msg !== undefined ) ? msg : 'You are dead.';
        this.room = new RoomModel( 'You see an eerie river with a skeletal boatman.' );

        DeadHeroViewController.show(
            this.viewHandler.ctrlDom,
            this.preGame.bind( this )
        );

        this.update();
    }

    win() {
        this.state = 'win';
        this.message = 'You won.';
        this.room = new RoomModel( 'You\'re in IT/CS heaven. Yay you. Sadly, somebody forgot to code it.' );

        alert( 'Y O U   W O N.   G O   G E T   A   L I F E.' );
    }

    setState( state ) {
        this.state = state;
        this.viewHandler.setTitle( APP_NAME + ' :: ' + state );
    }

    getEnemyMessage() {
        return ( this.hero === null )
            ? ''
            : ( ( this.hero.hp <= 0 )
                    ? 'You have been eaten by a grue.'
                    : ( ( this.enemy === null )
                            ? 'You see nobody here.'
                            : 'You see an enemy: ' + this.enemy.name + ' (' + this.enemy.getHpDescription() + ')'
                    )
            );
    }

    update() {
        this.stats.update( this.hero );

        this.viewHandler.setMessage( this.message );
        this.viewHandler.setEnemyMessage( this.getEnemyMessage() );
        this.viewHandler.setMainViewContent( this.room === null ? '' : this.room.description );
    }

    createRandomRoom() {
        return new RoomModel( MiscUtils.randomElement( this.gameData.locations ) );
    }

    createRandomEnemy() {
        const protos = this.gameData.actorProtos;

        for ( let i = 0; i < 10; i++ ) {
            let proto = protos.get( MiscUtils.randomElement( [...protos.keys()] ) );
            let actor = new ActorModel( proto );
            if ( actor.level <= this.hero.level && actor.frequency >= Math.random() ) {
                return actor;
            }
        }

        return null;
    }

    heroAttack() {
        const heroAttack = this.hero.attack( this.enemy );

        if ( heroAttack === undefined ) {
            return 'You\'re incapacitated.';
        }
        if ( heroAttack === null ) {
            return 'You miss the ' + this.enemy.name + '.';
        }
        return 'You hit the ' + this.enemy.name + ' for ' + heroAttack + ' damage.';
    }

    enemyAttack() {
        const enemyAttack = this.enemy.attack( this.hero );

        if ( enemyAttack === undefined ) {
            return this.enemy.name + ' is incapacitated.';
        }
        if ( enemyAttack === null ) {
            return this.enemy.name + ' misses you.';
        }
        return this.enemy.name + ' hits you for ' + enemyAttack + ' damage.';
    }

    attack() {
        this.message = ( this.hero.agility >= this.enemy.agility )
            ? this.heroAttack() + ' ' + this.enemyAttack()
            : this.enemyAttack() + ' ' + this.heroAttack();
    }
}
