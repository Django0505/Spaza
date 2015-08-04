module.exports = function(connection){

var outputQuery = function(query,cb){
    connection.query(query, cb);

};

var inputQuery = function(query, data, cb){
connection.query(query, data, cb);

};
this.showSuppliers = function(cb){
    outputQuery('SELECT * FROM suppliers', cb);

};

this.insertSupplier = function(data, cb){
    inputQuery('INSERT INTO suppliers SET ?',data, cb);

};

this.deletingSupplier = function(data, cb){
    inputQuery('DELETE FROM suppliers WHERE supplier_id = ?', data, cb);
};


};
