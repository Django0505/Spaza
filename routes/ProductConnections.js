module.exports = function(connection){

var outputQuery = function(query,cb){
    connection.query(query, cb);

};

var inputQuery = function(query, data, cb){
connection.query(query, data, cb);

};
this.showProducts = function(cb){
    outputQuery('SELECT * from products, categories where products.category_id=categories.category_id', cb);

};

this.searchingProducts = function(data, cb){
    inputQuery('SELECT * from products where product_name LIKE ?',data, cb);

};

  this.showCategories = function(cb){
    outputQuery('SELECT * FROM categories', cb);

};

this.insertProduct = function(data, cb){
    inputQuery('insert into products set ?',data, cb);

};

this.deletingProduct = function(data, cb){
    inputQuery('DELETE FROM products WHERE product_id = ?', data, cb);
};

this.updatingProduct = function(data, cb){
    inputQuery('UPDATE products SET ? WHERE product_id = ?', data, cb);

};


};
