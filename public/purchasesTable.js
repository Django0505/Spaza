// var Converter = require("csvtojson").core.Converter;
// var fs = require("fs");
// var productManager = require("./productManager.js");
// var csvPurchases = "./NelisaPurchases.csv";
// var fileStream2 = fs.createReadStream(csvPurchases);
// var csvConverter2 = new Converter({
//     constructResult: true
// });
// csvConverter2.on("end_parsed", function(products) {
// 	console.log(JSON.stringify(products));
//     var productsSoldMap = {};

//     products.forEach(function(product) {
//         var productName = product["stock item"];
//         if (!productsSoldMap[productName]) {
//             productsSoldMap[productName] = 0;
//         }
//         productsSoldMap[productName] = productsSoldMap[productName] + product["No sold"];

//     });

// })

// fileStream2.pipe(csvConverter2);






//Converter Class 
var Converter=require("csvtojson").core.Converter;
var fs=require("fs");
 
var csvFileName="./NelisaPurchases.csv";
var fileStream=fs.createReadStream(csvFileName);
//new converter instance 
var csvConverter=new Converter({constructResult:true});
 
//end_parsed will be emitted once parsing finished 
csvConverter.on("end_parsed",function(purchases){

	// var jsonFile = JSON.stringify(jsonObj);
 //   console.log(JSON.parse(jsonFile)); //here is your result json object 
   console.log(purchases);
});
 
//read from file 
fileStream.pipe(csvConverter);































