'use strict';

class Range {
  constructor( min, max = min ) {
    this.min = min;
    this.max = max;
  }

  length() {
    return this.max - this.min;
  }

  rnd() {
    return Math.floor( Math.random() * this.length() + this.min );
  }

  add( other ) {
    if ( this.min < other.min && this.max < other.min ) {
      return [this, other];
    }
    if ( this.max > other.max && this.max > other.max ) {
      return [other, this];
    }
    return [new Range(
      Math.min( this.min, other.min ),
      Math.max( this.max, other.max ) )];
  }

  contains( n ) {
    return n >= this.min && n <= this.max;
  }
}

class Size {
  constructor( xRange, yRange ) {
    this.xRange = xRange;
    this.yRange = yRange;
  }
}

class Map {
  constructor( size, filler ) {
    this.size = size;
    this.cells = Array( ( size.xRange.length() + 1 ) * ( size.yRange.length() + 1 ) )
      .fill( filler );
  }

  getRealIndex( x, y ) {
    const realX = x - this.size.xRange.min;
    const realY = y - this.size.yRange.min;
    const idx = this.size.xRange.length() * realY + realX;
    return idx;
  }

  getCell( x, y ) {
    return this.cells[this.getRealIndex( x, y )];
  }

  setCell( x, y, value ) {
    this.cells[this.getRealIndex( x, y )] = value;
  }

  setCellRect( rangeX, rangeY, value ) {
    for ( let y = rangeY.min; y <= rangeY.max; y++ ) {
      for ( let x = rangeX.min; x <= rangeX.max; x++ ) {
        this.setCell( x, y, value );
      }
    }
  }

  setCellLineH( rangeX, y, value ) {
    for ( let x = rangeX.min; x <= rangeX.max; x++ ) {
      this.setCell( x, y, value );
    }
  }

  setCellLineV( x, rangeY, value ) {
    for ( let y = rangeY.min; y <= rangeY.max; y++ ) {
      this.setCell( x, y, value );
    }
  }

  // end of class Map()
}

const mapSize = new Size( new Range( 0, 74 ), new Range( 0, 39 ), );
const roomCountRange = new Range( 5, 10 );
const roomSizeRange = new Range( 3, 7 );
const connectionCountRange = new Range( 0, 3 );
const corridorTurnCountRange = new Range( 0, 2 );

export function init() {
  const map = new Map( mapSize, '#' );
  map.setCellRect( new Range( 10, 15 ), new Range( 10, 15 ), '.' );
  map.setCellLineH( new Range( 16, 20 ), 13, '-' );

  let s = '';
  for ( let y = mapSize.yRange.min; y <= mapSize.yRange.max; y++ ) {
    for ( let x = mapSize.xRange.min; x <= mapSize.xRange.max; x++ ) {
      const cell = map.getCell( x, y );
      s += ( cell === null ) ? ' ' : cell;
    }
    s += '\n';
  }
  const el = document.createElement( 'PRE' );
  el.style.backgroundColor = 'white';
  el.style.color = 'black';
  el.textContent = s;
  document.body.appendChild( el );
}
