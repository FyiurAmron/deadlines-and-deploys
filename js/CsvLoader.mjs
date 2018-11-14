export class CsvLoader {
    constructor() {
    }

    static async load( csvPath ) {
        const response = await fetch( csvPath );
        if ( !response.ok ) {
            return null;
        }
        const csv = await response.text();
        const rows = csv.split( /\r?\n/ );
        return rows.map( x => x
            .split( "," )
            .map( x => x.trim() ) );
    }
}
