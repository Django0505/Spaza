

$(document).ready(function() {
   
	$("#productSearch").keyup(function(){
			//alert( "Handler for .keydown() called." );

			var searchQuery = $("#productSearch").val();
			
			$.get("/products/"+ searchQuery, function(results){
				$("#productSearchResults").html(results);
				//async: true
				//console.log(searchQuery);
				//console.log(results)
			});
	});
});
    //searchQuery = $('productSearch').val(),






