'use strict';

export class MiscUtils {
  static domClear( dom ) {
    while ( dom.firstChild !== null ) {
      dom.firstChild.remove();
    }
  }

  static randomElement( array ) {
    return array[Math.floor( Math.random() * array.length )];
  }

  static showMenu( dom, menuOptions, prompt, callback ) {
    MiscUtils.domClear( dom );

    if ( prompt !== null ) {
      const p = document.createElement( 'P' );
      p.innerText = prompt;
      dom.appendChild( p );
    }

    const keyMap = new Map();
    menuOptions.forEach( optName => {
      const btn = document.createElement( 'A' );
      btn.href = '#';
      btn.style.display = 'block';
      btn.innerText = optName;
      const listener = ( evt => {
        callback( optName, evt );
      } );
      btn.addEventListener( 'click', listener );
      keyMap.set( optName.charAt( 0 ).toLowerCase(), listener );
      dom.appendChild( btn );
    } );

    window.onkeyup = function ( evt ) {
      const listener = keyMap.get( evt.key );

      if ( listener !== undefined ) {
        window.onkeyup = null;
        listener( evt );
      }
    };
  }
}