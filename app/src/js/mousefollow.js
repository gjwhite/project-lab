var $ = require("jquery");

$(document).bind('mousemove', function(e){
    $('.follow').css({
       left:  e.pageX - 8,
       top:   e.pageY - 8
    });
});

$(document).bind('mousedown', function(){
    $('.follow').css({
        transform: scale(1.2)
    });
});


// var mouse = {
//     x: undefined,
//     y: undefined
// }

// var follow = document.querySelector('.follow');

// window.addEventListener('mousemove', function(event) {
//     mouse.x = event.x;
//     mouse.y = event.y;
//     console.log(mouse);

// });
