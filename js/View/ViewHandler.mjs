'use strict';

import { MiscUtils } from '../Util/MiscUtils.mjs';

export class ViewHandler {
  constructor( doc ) {
    this.doc = doc;

    this.statsDom = doc.getElementById( 'status' );
    this.invDom = doc.getElementById( 'inv' );
    this.mainViewDom = doc.getElementById( 'view' );
    this.ctrlDom = doc.getElementById( 'ctrl' );
    this.msgDom = doc.getElementById( 'msg' );
    this.enemyDom = doc.getElementById( 'enemy' );

    this.loader = doc.getElementById( 'loader' );
    this.content = doc.getElementById( 'content' );

    [this.statsDom, this.invDom, this.mainViewDom, this.ctrlDom, this.msgDom, this.enemyDom]
      .forEach( x => MiscUtils.domClear( x ) );
  }

  hidePreloader() {
    this.loader.style.display = 'none';
    this.content.style.display = 'block';
  }

  setTitle( title ) {
    this.doc.title = title;
  }

  setMainViewContent( content ) {
    this.mainViewDom.innerText = content;
  }

  setMessage( msg ) {
    this.msgDom.innerText = msg;
  }

  setEnemyMessage( msg ) {
    this.enemyDom.innerText = msg;
  }

}