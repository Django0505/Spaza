$(document).ready(function() {
    //=====Toastr
    //Command: toastr["success"]("Added new Product", "Success")

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    //=== Add product toast
    //$('#toastProduct').click(function() {

        //toastr.warning('Adding new product...');
        /**
        $.post("/products", productData ,function(resultSection){

            //render results into your page...


            toastr.success('New product added');
        })

        */
   // });

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