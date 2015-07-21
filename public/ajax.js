Command: toastr["success"]("You are now signed up!", "Success")

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




$(document).ready(function() {
    //=====validation


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
        //alert( "Handler for .keydown() called." );

        var searchQuery = $("#salesSearch").val();
        //  $.get("/spazaData/" + searchQuery, function(results) {				
        //     $("#salesSearchResults").hide;

        //     //async: true
        //     //console.log(searchQuery);
        //     console.log(results)
        // });

        $.get("/sales/" + searchQuery, function(results) {
            $("#salesSearchResults").html(results);

            //async: true
            //console.log(searchQuery);
            console.log(results)
        });
    });

});
//searchQuery = $('productSearch').val(),