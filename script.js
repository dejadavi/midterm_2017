$(document).ready(function(){

////Set up initial data array on backend
//populate DOM
function initialize(){

var $container = $("<div></div>").css("float","left");

for(var i = 0; i < 3; i++) {
    for (var j = 0; j < 4; j++){
        $("<div></div>").addClass("box").appendTo($container);
    }
    $("<div></div>").css("clear", "both").appendTo($container);
}

$container.appendTo($("body"));
console.log($container);
    
}


initialize();

// function populateDOM(args){


// }


// ///on click, function checks if seat reserved
// ///if reserved, fire message
// ////if not, trigger reserve modal
// function reserve {





// }






})