exports.multiply = function (number, cb){
	setTimeout(function(){
		var result = number * 7;
		//console.log( number * 7)
		if (number == 6){
			return cb("6 is not allowed", null)
		}
		cb(null, result);
	},1000);	
}
