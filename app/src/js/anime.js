var $ = require('jquery');

import snap from 'snapsvg-cjs';
import anime from 'animejs';

console.log('Animate!');

$(document).ready(function () {

	var aData = document.querySelector('.a-data');
	//console.log(aData);
	var offset = aData.dataset.offset;
	//console.log(offset);
	var Intro = anime.timeline();

	Intro
	.add({
		targets: '#anime .a-bg--zoom',
		scale: {
			value: [ 1, 1.1 ],
			duration: 1100,
			easing: [ 0, 0, 0.32, 1 ]
		},
		backgroundPosition: ['50%', '100%'],
		duration: 2000,
		easing: [ 0, 0, 0.32, 1 ],
	})
	.add({
		targets: '#anime .c-landing__content-wrap',
		opacity: {
			value: [ 0, 1 ],
			duration: 2000,
			easing: [ 0, 0, 0.32, 1 ],
			offset: 300,
		},
		width: [ 0, '50%' ],
		translateX: [ 0, '100%' ],
		easing: [ 0.8, 0, 0.2, 1 ],
		duration: 1000,
		offset: 300,
		begin: function() {
			console.log('begin');
			toLeft();
		}

	})
	.add({
		targets: '#anime .a-scoot--left',
		opacity: [ 0, 1 ],
		translateX: [ 0, '-140px' ],
		easing: [ 0.8, 0, 0.2, 1 ],
		duration: 1000,
		offset: 900,
	})
	.add({
		targets: '#anime .a-scoot--right',
		opacity: [ 0, 1 ],
		translateX: [ 0, 30 ],
		easing: [ 0.8, 0, 0.2, 1 ],
		duration: 1000,
		offset: 850,
	})
	.add({
		targets: '#anime .a-fade-in-up',
		opacity: [ 0, 1 ],
		translateY: [ 30, 0 ],
		easing: [ 0.8, 0, 0.2, 1 ],
		duration: 1000,
		offset: 900,
		complete: function() {
			console.log('complete');
			extra();
		}
	});

	document.querySelector('#anime .js-outro').onclick = Intro.restart;

});

function extra() {
	var outroGo = anime.timeline();

	outroGo
	.add({
		targets: [ '#anime .a-scoot--left', '#anime .fade-in-up' ],
		opacity: [ 1, 0 ],
		translateX: 30,
		easing: [ 0.8, 0, 0.2, 1 ],
		duration: 900,
		delay: 3000,
	})
	.add({
		targets: '#anime .c-landing__content-wrap',
		width: [ '50%', '100%' ],
		translateX: [ '100%', 0 ],
		easing: [ 0.8, 0, 0.2, 1 ],
		duration: 1000,
		offset: '-=400',
		begin: function() {
			console.log('begin');
			toRight();
		}
	})
	.add({
		targets: '#anime .c-landing__content-wrap',
		width: [ '100%', '50%' ],
		easing: [ 0.8, 0, 0.2, 1 ],
		duration: 900,
		delay: 30,
	})
	.add({
		targets: '#anime .a-scoot--left',
		opacity:  [ 0, 1 ],
		easing: [ 0.8, 0, 0.2, 1 ],
		duration: 900,
		offset: '-=300',
	});
};

//function morphLeft() {

	// var morphing = anime({
	// targets: '.c-landing__content-wrap-bg #c-landing__content-wrap-bg',
	// points: [
	// 	{ value: '197 0 837 0 837 143.333333 837 286.666667 837 430 837 573.333333 837 716.666667 837 860 197 860 149.085938 716.666667 0.015625 573.333333 158.972656 430 184.558594 286.666667 119.203125 143.333333' },
	// 	{ value: '0 0 640 0 640 143.333333 640 286.666667 640 430 640 573.333333 640 716.666667 640 860 0 860 0 716.666667 0 573.333333 0 430 0 286.666667 0 143.333333' },

	// ],
	// easing: [ 0.8, 0, 0.2, 1 ],
	// duration: 1500,
	// loop: false,
	// });
//};

	var svg = document.getElementById('svg-bg');

	var s = Snap(svg);

	var restObj = Snap.select('#rec-rest');
	var leftObj = Snap.select('#rec-left');
	var rightObj = Snap.select('#rec-right');
	var restObjPoints = restObj.node.getAttribute('d');
	var leftObjPoints = leftObj.node.getAttribute('d');
	var rightObjPoints = rightObj.node.getAttribute('d');
	var toLeft = function(){
	  restObj.animate({ d: leftObjPoints }, 1000, mina.easeout, toRest);
	}
	var toRight = function(){
		restObj.animate({ d: rightObjPoints }, 750, mina.easein, toRest);
	  }
	var toRest = function(){
	  restObj.animate({ d: restObjPoints }, 250, mina.easeinout);
	}

// function morphRight() {

// 	var morphing = anime({
// 	targets: '.c-landing__content-wrap-bg #c-landing__content-wrap-bg',
// 	points: [
// 		{ value: '0 0 640 0 683.746094 143.333333 693.074219 286.666667 718 430 693.074219 573.333333 683.746094 716.666667 640 860 0 860 0 716.666667 0 573.333333 0 430 0 286.666667 0 143.333333' },
// 		{ value: '0 0 640 0 640 143.333333 640 286.666667 640 430 640 573.333333 640 716.666667 640 860 0 860 0 716.666667 0 573.333333 0 430 0 286.666667 0 143.333333' },
// 	],
// 	easing: [ 0.8, 0, 0.2, 1 ],
// 	duration: 1100,
// 	loop: false,
// 	});

// 	console.log('morphing');
// };
