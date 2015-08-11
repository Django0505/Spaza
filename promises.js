var Promise = require("bluebird");

var multiply = Promise.promisifyAll(require('./multiply-promise')); 

/*
multiply.multiplyAsync(9)
	.then(function(result){
		console.log('----');
		console.log(result);
	}).then(function(){
		console.log('bye, bye!')
	});
*/

Promise.join(multiply.multiplyAsync(9),
			 multiply.multiplyAsync(7),
			 multiply.multiplyAsync(6),
			 multiply.multiplyAsync(3),
			 function(nine, seven, three){
			 	console.log(nine);
			 	console.log(seven);
			 	console.log(three);
			 }).error(function(err){
			 	console.log(err)
			 });;

/*
multiply.multiply(6, function(err, result){
	if (err){
		return console.log(err)
	}
	console.log(result);
});
*/

/*
multiply(9)
	.then(function(result){
		console.log(result);
	})
	.error(function(err){
		return console.log(err)	
	});

join(multiply(9), multiply(7), function(nine, seven){
	console.log(nine * seven);
});
*/

console.log('bye');