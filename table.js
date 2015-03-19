//Converter Class
var Converter = require("csvtojson").core.Converter;
var fs = require("fs");

var productManager = require("./productManager.js");

var csvFileName = "./Sales.csv";
var fileStream = fs.createReadStream(csvFileName);
//new converter instance
var csvConverter = new Converter({
        constructResult: true
});
var categoryMapping = {

        'Milk 1l': 'stapleFoods',
        'Imasi': 'stapleFoods',
        'Bread': 'stapleFoods',
        'Chakalaka Can': 'nonPerishables',
        'Gold Dish Vegetable Curry Can': 'nonPerishables',
        'Fanta 500ml': 'drinks',
        'Coke 500ml': 'drinks',
        'Cream Soda 500ml': 'drinks',
        'Iwisa Pap 5kg': 'stapleFoods',
        'Top Class Soy Mince': 'nonPerishables',
        'Shampoo 1 litre': 'bathroom',
        'Soap Bar': 'bathroom',
        'Bananas - loose': 'fruit',
        'Apples - loose': 'fruit',
        'Mixed Sweets 5s': 'giftItems',
        'Heart Chocolates': 'giftItems',
        'Rose (plastic)': 'giftItems',
        'Valentine Cards': 'giftItems'
};

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed", function(products) {
        //console.log(products); //here is your result json object
        var productsSoldMap = {};

        products.forEach(function(product) {
                var productName = product["stock item"];
                if (!productsSoldMap[productName]) {
                        productsSoldMap[productName] = 0;
                }
                productsSoldMap[productName] = productsSoldMap[productName] + product["No sold"];

        });

        var categoryMap = {};
        products.forEach(function(product) {
                var qty = product["No sold"];
                var categoryName = categoryMapping[product["stock item"]];
                if (!categoryMap[categoryName]) {
                        categoryMap[categoryName] = 0;
                }

                categoryMap[categoryName] = categoryMap[categoryName] + qty;

        });


        //daysSoldMap
        
        var daysSoldMap = {};

        products.forEach(function(product) {
                var productName = product["stock item"];
                //var Days =product["Day"];
                var qty = product["No sold"];
                //var totalDaysSold = 0;
                if (!daysSoldMap[productName]) {
                        daysSoldMap[productName] = 0;
                        
                }
                if(qty > 0){
                  daysSoldMap[productName] +=1;  //product["No sold"] ;//+ totalDaysSold;
                  
                }
        });
        console.log(daysSoldMap);
        console.log("\nAll the categories:\n \t" + JSON.stringify(categoryMap));
        console.log("\nAll products and their sales totals :\n \t" + JSON.stringify(productsSoldMap));
        console.log("\nMost selling category : \n \t" + JSON.stringify(productManager.returnsMostSellingCat(categoryMap)));
        console.log("\nLeast selling category : \n \t" + JSON.stringify(productManager.returnsLeastSellingCat(categoryMap)));
        console.log("\nMost sold product :\n \t" + JSON.stringify(productManager.returnsMostSellingProd(productsSoldMap)));
        console.log("\nLeast sold product : \n \t" + JSON.stringify(productManager.returnsLeastSellingProd(productsSoldMap)));
        console.log("\nMost regular sales : \n \t" + JSON.stringify(productManager.returnsMostRegularSales(daysSoldMap)));
}); 


//read from file
fileStream.pipe(csvConverter);