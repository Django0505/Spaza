//Converter Class
var Converter = require("csvtojson").core.Converter;
var fs = require("fs");

var productManager = require("./productManager.js");
var purchasesTable = require("./purchaseData.json");

var csvFileName = "./Sales.csv";

//
//this is the purchases csv
//
//console.log(purchasesTable);
// var purchasedStockMap = {};

// purchasesTable.forEach(function(purchase) {
//     var purchaseName = purchase["Item"];
//     if (!purchasedStockMap[purchaseName]) {
//         purchasedStockMap[purchaseName] = 0;
//     }
//     purchasedStockMap[purchaseName] = purchasedStockMap[purchaseName] +
//         purchase["Quantity"];

// });
// var StockMap = JSON.stringify(purchasedStockMap);
// console.log("This is what was purchased : \t \n " + StockMap);
// //console.log(Object.keys(StockMap));

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

    //console.log(products);

    //put products into a json file - then require that...
    
    //var productDatasource = new ProductDatasource(products); 
    //var productManager = new ProductManager(productDatasource);
    //productManager.returnsMostRegularSales();

    //productManager.
    
    //here is your result json object
    var productsSoldMap = {};

    //groupByProductName
    products.forEach(function(product) {
        var productName = product["stock item"];
        if (!productsSoldMap[productName]) {
            productsSoldMap[productName] = 0;
        }
        productsSoldMap[productName] = productsSoldMap[productName] +
            product["No sold"];

    });

    //groupByCategory
    var categoryMap = {};
    products.forEach(function(product) {
        var qty = product["No sold"];
        var categoryName = categoryMapping[product["stock item"]];
        if (!categoryMap[categoryName]) {
            categoryMap[categoryName] = 0;
        }

        categoryMap[categoryName] = categoryMap[categoryName] + qty;

    });

    //

    //daysSoldMap

    var daysSoldMap = {};

    //productDatasource.forEachProduct() -- being smart
    //productDatasource.productList
    
    products.forEach(function(product) {
        var productName = product["stock item"];
        //var Days =product["Day"];
        var qty = product["No sold"];
        //var totalDaysSold = 0;
        if (!daysSoldMap[productName]) {
            daysSoldMap[productName] = 0;

        }
        if (qty > 0) {
            daysSoldMap[productName] += 1; //product["No sold"] ;//+ totalDaysSold;

        }
    });

    var stockMapFinal = productManager.returnsStockMap(purchasesTable);

    console.log( productManager.returnsStockMap(purchasesTable));
    console.log("===================");
    console.log("\nAll the categories:\n \t" + JSON.stringify(categoryMap));
    console.log("===================");
    console.log("\nAll products and their sales totals :\n \t" +
        JSON.stringify(productsSoldMap));
    //console.log("\nAll products and their sales totals :\n \t" +
      //  JSON.stringify(productsSoldMap.sort(function(a,b){return b - a})));
    console.log("===================");
    console.log("\nMost selling category : \n \t" +
        JSON.stringify(productManager.returnsMostSellingCat(categoryMap)));
    console.log("===================");
    console.log("\nLeast selling category : \n \t" +
        JSON.stringify(productManager.returnsLeastSellingCat(categoryMap)));
    console.log("===================");
    console.log("\nMost sold product :\n \t" +
        JSON.stringify(productManager.returnsMostSellingProd(productsSoldMap)));
    console.log("===================");
    console.log("\nLeast sold product : \n \t" +
        JSON.stringify(productManager.returnsLeastSellingProd(productsSoldMap)));
    console.log("===================");
    console.log("\nMost regular sales : \n \t" +
        JSON.stringify(productManager.returnsMostRegularSales(daysSoldMap)));
    console.log("===================");
    console.log("\nLeast regular sales : \n \t" +
        JSON.stringify(productManager.returnsLeastRegularSales(daysSoldMap)));
    //console.log(purchasesTable.purchases);

    //var stockLevel = stockMap["Quantity"] - productsSoldMap[productName["No sold"]];
    //
    
    //console.log("*** : " +  JSON.stringify( productsSoldMap ) );
    //console.log("**** : " + stockMapFinal);

    console.log("===================");

    console.log(productManager.returnsStockLevels(productsSoldMap, stockMapFinal));
    
    //console.log(Object.keys(productsSoldMap));
    //console.log(productsSoldMap[productName["No sold"]] );
    //console.log(stockLevel);




});


//read from file
fileStream.pipe(csvConverter);