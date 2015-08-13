var weather = require('weather-js');
 
// Options: 
// search:     location name or zipcode 
// degreeType: F or C 
 
weather.find({search: 'Bellville, Western Cape', degreeType: 'C'}, function(err, result) {
  if(err) console.log(err);
 
  console.log(JSON.stringify(result, null, 2));

});

var hello = function *(name){
	yield "Your name is " + name;
	return ("hello" + name)
}
var gen = hello(" Todd");
//console.log(hello(" Boss"));
console.log(gen.next());
//value return value and done is completion
//yield pause
console.log(gen.next());
