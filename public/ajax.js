$(document).ready(function() {
   

    //===
    $("#productSearch").keyup(function() {
        //alert( "Handler for .keydown() called." );

        var searchQuery = $("#productSearch").val();
        //  $.get("/products/" + searchQuery, function(results) {
        //     $("#productSearchResults").hide();

        // });
        $.get("/product/" + searchQuery, function(results) {
            $("#productSearchResults").html(results);
            //async: true
            //console.log(searchQuery);
            //console.log(results)
        });
    });


    $("#salesSearch").keyup(function() {
        var searchQuery = $("#salesSearch").val();
        $.get("/sales/" + searchQuery, function(results) {
            $("#salesSearchResults").html(results);
            console.log(results)
        });
    });



    //=====username search
       $("#usernameSearch").keyup(function() {
        var searchQuery = $("#usernameSearch").val();
        $.get("/login/" + searchQuery, function(results) {
            //$("#salesSearchResults").html(results);
            console.log("ajax",results);
            if(results === searchQuery){
                $("#sinupButton").hide()
            }else if(results !== searchQuery){
               $("#sinupButton").show() 
            }

            console.log(results)
        });
    });

});
//searchQuery = $('productSearch').val(),