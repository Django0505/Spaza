module.exports = function(connection){

var outputQuery = function(query,cb){
    connection.query(query, cb);

};

var inputQuery = function(query, data, cb){
	connection.query(query, data, cb);
};

this.showCategories = function(cb){
    outputQuery('SELECT * FROM categories', cb);

};

this.insertCategory = function(data, cb){
    inputQuery('INSERT INTO categories SET ?', data, cb);

};

this. deletingCategory = function(data, cb){
    inputQuery('DELETE FROM categories WHERE category_id = ?', data, cb);
};

this.updatingCategory = function(data, cb){
    inputQuery('UPDATE categories SET ? WHERE category_id = ?', data, cb);

};
















}
