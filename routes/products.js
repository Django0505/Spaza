
/***
 * A very basic CRUD example using MySQL
 */	

//todo - fix the error handling
//
exports.show = function (req, res, next) {
	
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT * from products', [], function(err, results,fields) {
        	if (err) return next(err);
        	
    		res.render( 'products', {
    			products : results
    		});
      });
	});
};
//

// exports.show = function (req, res, next) {
// 	req.getConnection(function(err, connection){
// 		if (err) 
// 			return next(err);
// 		connection.query('SELECT * from products', [], function(err, results) {
//         	if (err) return next(err);

//     		res.render( 'home', {
//     			products : results
//     		});
//       });
// 	});
// };

exports.suppliers = function(req, res, next){
	
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT distinct shop FROM orders_table', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'suppliers', {
    			products : results
    		});
      });
	});

}
exports.productsAndCategories = function(req, res, next){
	
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT product_name,category_name FROM products join categories on products.category_id = categories.category_id order by category_name asc;',
			 [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'productsAndCategories', {
    			productsAndCategories : results
    		});
      });
	});

}
exports.mostSold = function(req, res, next){
	var fs = require('fs');
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('select stock_item, sum(no_sold) as sold_total from purchase_table group by stock_item order by sold_total desc;',
			 [], function(err, results) {
        	if (err) return next(err);
fs.writeFile('fsProductsTable.json', JSON.stringify(results), function(err){
        		if (err) throw err;
        		console.log('saved mostSold File!');
        	})
    		res.render( 'mostSold', {
    			mostSold : results
    		});
      });
	});

}
exports.leastSold = function(req, res, next){
	
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('select stock_item, sum(no_sold) as sold_total from purchase_table group by stock_item order by sold_total asc;',
			 [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'leastSold', {
    			leastSold : results
    		});
      });
	});

}

 exports.add = function (req, res, next) {
 	req.getConnection(function(err, connection){
 		if (err){ 
 			return next(err);
 		}
		
 		var input = JSON.parse(JSON.stringify(req.body));
 		var data = {
             		product_name : input.product_name
         	};
 		connection.query('insert into products set ?', data, function(err, results) {
         		if (err)
               		return	console.log("Error inserting : %s ",err );
         
           		res.redirect('/')
 		});
 	});
 	
}

// exports.get = function(req, res, next){
// 	var id = req.params.id;
// 	req.getConnection(function(err, connection){
// 		connection.query('SELECT * FROM products WHERE id = ?', [id], function(err,rows){
// 			if(err){
//     				console.log("Error Selecting : %s ",err );
// 			}
// 			res.render('edit',{page_title:"Edit Customers - Node.js", data : rows[0]});      
// 		}); 
// 	});
// };

// exports.update = function(req, res, next){

// 	var data = JSON.parse(JSON.stringify(req.body));
//     	var id = req.params.id;
//     	req.getConnection(function(err, connection){
//     		connection.query('UPDATE products SET ? WHERE id = ?', [data, id], function(err, rows){
//     			if (err){
//               			console.log("Error Updating : %s ",err );
//     			}
//           		res.redirect('/products');
//     		});
    		
//     });
// };

// exports.delete = function(req, res, next){
// 	var id = req.params.id;
// 	req.getConnection(function(err, connection){
// 		connection.query('DELETE FROM products WHERE id = ?', [id], function(err,rows){
// 			if(err){
//     				console.log("Error Selecting : %s ",err );
// 			}
// 			res.redirect('/products');
// 		});
// 	});
// };
