'use strict';

import { DATA_SUFFIX } from '../const.mjs';

export class GameData {
    constructor( loader ) {
        this.actorProtos = null;
        this.playableRaces = null;
        this.locations = null;

        this.loader = loader;
    }

    async init() {
        const actorProtosRaw = await this.loader.load( './data/actorProtos' + DATA_SUFFIX + '.csv' );
        const playableRacesRaw = await this.loader.load( './data/playableRaces' + DATA_SUFFIX + '.csv' );
        const locationsRaw = await this.loader.load( './data/locations' + DATA_SUFFIX + '.csv' );

        this.actorProtos = actorProtosRaw.slice( 1 )
            .reduce(
                ( map, x ) => map.set( x[0], x ),
                new Map()
            );
        this.playableRaces = playableRacesRaw.map( x => x[0] );
        this.locations = locationsRaw.map( x => x[0] );
    }

}