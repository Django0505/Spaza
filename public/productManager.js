Admin = false;
exports.returnsMostSellingProd = function(productsSoldMap) {

    var mostSold = {
        name: "",
        qty: 0
    };

    // ??
    for (var product in productsSoldMap) {
        if (productsSoldMap.hasOwnProperty(product)) {
            var qtySold = productsSoldMap[product];
            if (qtySold > mostSold.qty) {
                mostSold.qty = qtySold;
                mostSold.name = product;
            }
        }
    }

    return mostSold;
};

exports.returnsLeastSellingProd = function(productsSoldMap) {

    var leastSold = {
        name: "",
        qty: Number.POSITIVE_INFINITY
    };

    // ??
    for (var product in productsSoldMap) {
        if (productsSoldMap.hasOwnProperty(product)) {
            var qtySold = productsSoldMap[product];
            if (qtySold < leastSold.qty) {
                leastSold.qty = qtySold;
                leastSold.name = product;
            }
        }
    }

    return leastSold;
};

exports.returnsMostSellingCat = function(categoryMap) {

    var mostSellingCat = {
        name: "",
        qty: 0
    };

    // ??
    for (var category in categoryMap) {

        if (categoryMap.hasOwnProperty(category)) {
            var qtySold = categoryMap[category];
            if (qtySold > mostSellingCat.qty) {
                mostSellingCat.qty = qtySold;
                mostSellingCat.name = category;
            }
        }
    }
    return mostSellingCat;

};
exports.returnsLeastSellingCat = function(categoryMap) {

    var leastSellingCat = {
        name: "",
        qty: Number.POSITIVE_INFINITY
    };

    // ??
    for (var category in categoryMap) {

        if (categoryMap.hasOwnProperty(category)) {
            var qtySold = categoryMap[category];
            if (qtySold < leastSellingCat.qty) {
                leastSellingCat.qty = qtySold;
                leastSellingCat.name = category;
            }
        }
    }

    return leastSellingCat;
};



//Regular sales
exports.returnsMostRegularSales = function(daysSoldMap) {

    // ??
    // 
    //
    var products = [];

    //let's create a list of objects from the map so the we can sort the list
    //
    //

    console.log(daysSoldMap);

    var products = Object.keys(daysSoldMap).map(function(key) {
        return {
            name: key,
            days: Number(daysSoldMap[key])
        };
    });

    console.log(products);

    /*
	for(var product in daysSoldMap){
		products.push({
			name : product,
			days : Number(daysSoldMap[product])
		});
	}
	*/

    //let's sort the list descending on days for each product
    var sortedProducts = products.sort(function(p1, p2) {
        // -1 less than
        // 0 eq
        // 1 greater than
        return p2.days - p1.days;
    });

    /*
	var regulars = sortedProducts.filter(function(product){
		return product.days === sortedProducts[0].days;
	});
	*/

    var regulars = [];
    for (var i = 0; i < sortedProducts.length; i++) {
        if (sortedProducts[i].days === sortedProducts[0].days) {
            regulars.push(sortedProducts[i]);
        }
    }

    var maxValue = 0; // assuming positive numbers only
    for (var key in daysSoldMap) {
        if (daysSoldMap[key] > maxValue) {
            maxValue = daysSoldMap[key];
        }
    }

    //console.log(maxValue + "  most reg sales");




    //console.log(regulars);
    //return mostRegular;

    return regulars;


};

//Least regular sales

exports.returnsLeastRegularSales = function(daysSoldMap) {

    var products = [];

    //let's create a list of objects from the map so the we can sort the list
    //
    //

    //console.log(daysSoldMap);

    var products = Object.keys(daysSoldMap).map(function(key) {
        return {
            name: key,
            days: Number(daysSoldMap[key])
        }
    });

    //console.log(products);

    /*
	for(var product in daysSoldMap){
		products.push({
			name : product,
			days : Number(daysSoldMap[product])
		});
	}
	*/

    //let's sort the list descending on days for each product
    var sortedProducts = products.sort(function(p1, p2) {
        // -1 less than
        // 0 eq
        // 1 greater than
        return p1.days - p2.days;
    });

    /*
	var regulars = sortedProducts.filter(function(product){
		return product.days === sortedProducts[0].days;
	});
	*/

    var regulars = [];
    for (var i = 0; i < sortedProducts.length; i++) {
        if (sortedProducts[i].days === sortedProducts[0].days) {
            regulars.push(sortedProducts[i]);
        }
    };

    var maxValue = 0; // assuming positive numbers only
    for (var key in daysSoldMap) {
        if (daysSoldMap[key] < maxValue) {
            maxValue = daysSoldMap[key];
        }
    }

    //console.log(maxValue + "  least reg sales");




    //console.log(regulars);
    //return mostRegular;

    return regulars;


};

//purchases file
exports.returnsStockMap = function(purchasesTable) {
    var purchasedStockMap = {};

    purchasesTable.forEach(function(purchase) {
        var purchaseName = purchase["Item"];
        if (!purchasedStockMap[purchaseName]) {
            purchasedStockMap[purchaseName] = 0;
        }
        purchasedStockMap[purchaseName] = purchasedStockMap[purchaseName] +
            purchase["Quantity"];

    });
    return purchasedStockMap;

    //var StockMap = JSON.stringify(purchasedStockMap);
    //console.log("This is what was purchased : \t \n " + StockMap);
    //return StockMap;

};


//subtracts the 2 given objects and gives difference
exports.returnsStockLevels = function(stockMap, productsSoldMap) {

    //console.log(" productsSoldMap : " +  productsSoldMap);

    var stockLevels = {};

    // for(var key in productsSoldMap){
    // 	console.log("<=> " + productsSoldMap[key]);
    // }

    for (var key in stockMap) {
        //console.log("---> " + Object.keys(productsSoldMap));
        stockLevels[key] = productsSoldMap[key] - stockMap[key];

        //console.log("=> " + productsSoldMap[key]);


        //console.log(level);
    }
    return stockLevels;

};

// exports.returnsX = {
// 	console.log(productsSoldMap);

// }




// var highScores = [];
// 	for (var i = 0; i < kids.length; i++) {
// 		if(kids[i].scores === kids[0].scores){
// 			highScores.push(kids[i]);
// 		}
// 	}