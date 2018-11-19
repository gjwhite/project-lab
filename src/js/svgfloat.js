
var $ = require('jquery');
import Snap from 'snapsvg-cjs';
import anime from 'animejs';
console.log('SVGFLOAT!');

$(document).ready(function () {


var svg = document.getElementById('svg-bg');

	var s = Snap(svg);

	var restObj = Snap.select('#rest');
	var oneObj = Snap.select('#one');
	var twoObj = Snap.select('#two');
	var restObjPoints = restObj.node.getAttribute('d');
	var oneObjPoints = oneObj.node.getAttribute('d');
	var twoObjPoints = twoObj.node.getAttribute('d');
	var toOne = function(){
	  restObj.animate({ d: oneObjPoints }, 5000, mina.easeinout, toTwo);
	}
	var toTwo = function(){
		restObj.animate({ d: twoObjPoints }, 5000, mina.easeinout, toRest);
	  }
	var toRest = function(){
	  restObj.animate({ d: restObjPoints }, 5000, mina.easeinout, toOne);
	}
	toOne();










});
