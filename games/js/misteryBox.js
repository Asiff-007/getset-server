'use strict';

var config = {
  type: Phaser.AUTO, // jshint ignore:line
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    preload: preload,
    create: create
  }
};

var game = new Phaser.Game(config); // jshint ignore:line

function preload () {

  this.load.setBaseURL('http://labs.phaser.io'); // jshint ignore:line

  this.load.image('sky', 'assets/skies/space3.png'); // jshint ignore:line
  this.load.image('logo', 'assets/sprites/phaser3-logo.png'); // jshint ignore:line
  this.load.image('red', 'assets/particles/red.png'); // jshint ignore:line
}

function create (){
  this.add.image(400, 300, 'sky'); // jshint ignore:line

  var style = { font: 'bold 32px Arial',
    fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' };
  var text = this.add.text(0, 0, name, style); // jshint ignore:line
  text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

  //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
  text.setTextBounds(0, 100, 800, 100);
 }