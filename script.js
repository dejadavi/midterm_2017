$(document).ready(function(){

////Set up initial data array on backend
//populate DOM
function initialize(nRow,nCol){

var $container = $("<div></div>").addClass("container");
var blackOut=[
    "1,0","1,15"
    ,"2,0","2,15"
    ,"3,0","3,1","3,14","3,15"
];

for(var row = 0; row < nRow; row++) { 
    
    var $row=$("<div></div>");
    
    for (var col = 0; col < (nCol-1); col++){
        $("<div></div>").addClass(function(){
            if(blackOut.indexOf(row+","+col)!=-1||row===4){
                return "blackout"
            } else {
                
                $(this).attr("id",(String.fromCharCode(nRow-row+96)+col).toUpperCase() );
            
                return "box"}
        
        }).appendTo($row); 
        
        

    }
    $("<div></div>").css("clear", "both").appendTo($row);
    
    $row.prependTo($container);
    
   

}
    

    
    
////Add letters, append to id and display
$container.appendTo($("body"));

    
}


function addId(row, col){

$(".box").attr("id",row+col).text(row+col);

}

initialize(6,17);

// function populateDOM(args){


// }


// ///on click, function checks if seat reserved
// ///if reserved, fire message
// ////if not, trigger reserve modal
// function reserve {





// }

    $('.box').on('click', function (){
     $(this).toggleClass('reserve');
        console.log($(this).attr("id"));
        $('#seat').append($(this).attr("id") + ", ");
        
    });
    
    




});