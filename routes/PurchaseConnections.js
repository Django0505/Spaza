module.exports = function(connection){

var outputQuery = function(query,cb){
    connection.query(query, cb);

};

var inputQuery = function(query, data, cb){
connection.query(query, data, cb);

};
this.showPurchases = function(cb){
    outputQuery('SELECT * FROM orders_table', cb);

};


this.insertPurchase = function(data, cb){
    inputQuery('insert into orders_table set ?,total_cost = quantity * cost',data, cb);

};

this.deletingPurchase = function(data, cb){
    inputQuery('DELETE FROM orders_table WHERE purchase_id = ?', data, cb);
};

this.updatingPurchase = function(data, cb){
    inputQuery('UPDATE products SET ? WHERE id = ?', data, cb);

};


};
