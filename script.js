$(document).ready(function () {

    // initialize tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    var cartArray = [];
    var total = new Big(0.00);
    var seats = new Big(0.00);

    //populate DOM
    function initialize(nRow, nCol) {

        var $container = $("<div></div>").addClass("container");
        var blackOut = [
            "1,0", "1,15"
            , "2,0", "2,15"
            , "3,0", "3,1", "3,14", "3,15"
        ];

        // container for prices that are attached to each div
        var priceByRow = {
            A: [10, "$"],
            B: [10, "$"],
            C: [12, "$$"],
            D: [12, "$$"],
            E: [15, "$$$"],
            F: [15, "$$$"],
            G: [11, "$$"]
        };

        // creates rows and colums with needed attributes
        for (var row = 0; row < nRow; row++) {

            var $row = $("<div></div>");

            for (var col = 0; col < (nCol - 1); col++) {
                $("<div></div>").addClass(function () {
                    if (blackOut.indexOf(row + "," + col) != -1 || row === 4) {
                        return "blackout"
                    } else {
                        var letter = String.fromCharCode(nRow - row + 96).toUpperCase();
                        $(this).attr("id", letter + col);
                        $(this).attr("data-toggle", "tooltip");
                        $(this).attr("title", "Open" + ", $" + priceByRow[letter][0] + ".00");
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

            // tack on row to rest of rows
            $row.prependTo($container);
        }
        // Add completed grid to DOM
        $container.appendTo($("body"));
    }
    // call initialize function
    initialize(6, 17);

    // adding to temp cart until purchased
    $(".box").on('click', function () {

        // if already purchased, exit function
        if ($(this).hasClass("purchased")) {
            return;
        };

        var arId = cartArray.indexOf($(this).attr('id'));

        $(this).toggleClass('reserve');

        // if not in cart return -1 else remove
        if (arId === -1) {

            cartArray.push($(this).attr('id'));
            total = total.plus(parseInt($(this).data("price")));
            console.log(total);
            $("#total").text("Total: $" + total);

        } else if (arId > -1) {

            cartArray.splice(arId, 1);
            total = total.minus(parseInt($(this).data("price")));
            console.log(total);
            $("#total").text("Total: $" + total);

        }
        // print selected seats
        $('#seat').text("Seats: " + cartArray);


    });
    // un-disable button upon name input
    $("#nameInput").on("input", function () {
        $("button").prop("disabled", false);

    })

    // Total up
    $("#checkout").on('click', function () {

        var $name = $('#nameInput').val();

        $(".box.reserve").each(function () {
            $(this).addClass("purchased").removeClass("reserve");
            $(this).data("name", $name);
            $("#total").text("Total: $0.00");
            $("#seat").text("");
            $("#nameInput").val("").attr("placeholder", "Enter your name");
            $(this).attr("title", "Booked by " + $name).tooltip('fixTitle').tooltip('show');



            // count+=$(this).data("counter");

            ///console.log($(this).data('name'))
        })

        // clear cart
        cartArray = [];
        total = Big(0.00);
    })

});
