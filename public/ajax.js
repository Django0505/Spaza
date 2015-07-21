$(document).ready(function() {
  
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