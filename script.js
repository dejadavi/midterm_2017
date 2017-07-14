$(document).ready(function () {

   var cartArray = [];
   var total=0;
   var seats=0;

    //populate DOM
    function initialize(nRow, nCol) {

        var $container = $("<div></div>").addClass("container");
        var blackOut = [
            "1,0", "1,15"
            , "2,0", "2,15"
            , "3,0", "3,1", "3,14", "3,15"
        ];

        var priceByRow={
            A:[10.99,"$"],
            B:[10.99,"$"],
            C:[12.99,"$$"],
            D:[12.99,"$$"],
            E:[15.99,"$$$"],
            F:[15.99,"$$$"],
            G:[11.99, "$$"]  
        };

        for (var row = 0; row < nRow; row++) {

            var $row = $("<div></div>");

            for (var col = 0; col < (nCol - 1); col++) {
                $("<div></div>").addClass(function () {
                    if (blackOut.indexOf(row + "," + col) != -1 || row === 4) {
                        return "blackout"
                    } else {
                        var letter=String.fromCharCode(nRow - row + 96).toUpperCase();
                        $(this).attr("id", letter+col);
                        $(this).data("price", priceByRow[letter])[0];
                        $(this).data("priceIcon", priceByRow[letter])[1];
                        $(this).data("counter", 1);
                        $(this).text(priceByRow[letter][1]);
                        //console.log($(this).data("price")[0]);
                     

                        return "box"
                    }

                }).appendTo($row);

            }
            $("<div></div>").css("clear", "both").appendTo($row);

            $row.prependTo($container);
        }
        ////Add letters, append to id and display
        $container.appendTo($("body"));
    }

    initialize(6, 17);

    $(".box").on('click', function () {
    
        if($(this).hasClass("purchased")){
            return;
        } ;
        
        $(this).toggleClass('reserve');
       
        var arId = cartArray.indexOf($(this).attr('id'));
        
        if (arId === -1) {

            cartArray.push($(this).attr('id'));
            total+=parseFloat($(this).data("price"));
            $("#total").text("Total: $"+total);

        } else {

            cartArray.splice(arId, 1);
            total-=parseFloat($(this).data("price"));
            $("#total").text("Total: $"+total);

        }
        $('#seat').text("Seats: " + cartArray.sort());
        

    });

    $("#nameInput").on("input", function(){
        $("button").prop("disabled",false);

    })

    ////Total up
    $("#checkout").on('click',function(){

      var $name=$('#nameInput').val();
     
        $(".box.reserve").each(function(){
            $(this).addClass("purchased").removeClass("reserve");
            $(this).data("name", $name);
            $("#total").text("Total: $0.00");
            $("#seat").text("");
            $("#nameInput").val("").attr("placeholder","Enter your name");
            cartArray = [];

           // count+=$(this).data("counter");

            ///console.log($(this).data('name'))
        })


        
        //$("#seats").text("Seats:"+seats);

    })
   
////end script
});
