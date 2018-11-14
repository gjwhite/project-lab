var $ = require('jquery');
window.onload = function () {

	var parallaxBox = document.getElementById ( 'box' );
	var c1left = document.getElementById ( 'l1' ).offsetLeft,
		c1top = document.getElementById ( 'l1' ).offsetTop,
		c2left = document.getElementById ( 'l2' ).offsetLeft,
		c2top = document.getElementById ( 'l2' ).offsetTop,
		c3left = document.getElementById ( 'l3' ).offsetLeft,
		c3top = document.getElementById ( 'l3' ).offsetTop,
		c4left = document.getElementById ( 'l4' ).offsetLeft,
		c4top = document.getElementById ( 'l4' ).offsetTop;

		// var offsetTop = document.querySelector('.js-get-offset').offsetTop;
		// var offsetLeft = document.querySelector('.js-get-offset').offsetLeft;
		// console.log(offsetTop);
		// console.log(offsetLeft);

		// var offsetData = document.querySelectorAll('.js-get-offset');
		// offsetData.forEach(function(data) {
		// 	var offsetTop = data.offsetTop;
		// 	var offsetLeft = data.offsetLeft;

		// 	// console.log('top: ' + offsetTop);
		// 	// console.log('left: ' + offsetLeft);

		// 	parallaxBox.onmousemove = function (event) {
		// 		event = event || window.event;
		// 		var x = event.clientX - parallaxBox.offsetLeft,
		// 			y = event.clientY - parallaxBox.offsetTop;

		// 		mouseParallax ( '.js-get-offset', offsetLeft, offsetTop, x, y, 2 );
		// 		// mouseParallax ( 'l2', c2left, c2top, x, y, 4 );
		// 		// mouseParallax ( 'l3', c3left, c3top, x, y, -4 );
		// 		// mouseParallax ( 'l4', c4left, c4top, x, y, -8 );
		// 	}
		// });


	parallaxBox.onmousemove = function (event) {
		event = event || window.event;
		var x = event.clientX - parallaxBox.offsetLeft,
			y = event.clientY - parallaxBox.offsetTop;

		mouseParallax ( 'l1', c1left, c1top, x, y, 2 );
		mouseParallax ( 'l2', c2left, c2top, x, y, 4 );
		mouseParallax ( 'l3', c3left, c3top, x, y, -4 );
		mouseParallax ( 'l4', c4left, c4top, x, y, -8 );
	}

}

function mouseParallax ( id, left, top, mouseX, mouseY, speed ) {
	var obj = document.getElementById ( id );
	//var obj = document.querySelector ( id );
	var parentObj = obj.parentNode,
	containerWidth = parseInt( parentObj.offsetWidth ),
	containerHeight = parseInt( parentObj.offsetHeight );
	obj.style.left = left - ( ( ( mouseX - ( parseInt( obj.offsetWidth ) / 2 + left ) ) / containerWidth ) * speed ) + 'px';
	obj.style.top = top - ( ( ( mouseY - ( parseInt( obj.offsetHeight ) / 2 + top ) ) / containerHeight ) * (speed * 4) ) + 'px';

	var xPos = ( ( ( mouseX - ( parseInt( obj.offsetWidth ) / 2 + left ) ) / containerWidth ) * speed ) + 'px';
	//console.log(xPos);
	var yPos = ( ( ( mouseY - ( parseInt( obj.offsetHeight ) / 2 + top ) ) / containerHeight ) * (speed * 3)) + 'px';
	//console.log(yPos);
	var zPos = ( ( ( mouseY - ( parseInt( obj.offsetHeight ) / 3 + top ) ) / containerHeight ) * (speed * 2)) + 'px';

	obj.style.transform = 'translate3d(' + xPos + ', ' + yPos + ', ' + zPos + ')';
}
