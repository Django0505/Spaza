

$(document).ready(function() {
   
	$("#productSearch").keypress(function(){
			//alert( "Handler for .keydown() called." );

			var searchQuery = $("#productSearch").val();
			
			$.get("/products/"+ searchQuery, function(results){
				$("#productSearchResults").html(results);
				console.log(searchQuery);
				console.log(results)
			});
	});
});
    //searchQuery = $('productSearch').val(),






