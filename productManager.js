
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

    var products = [];

    console.log(daysSoldMap);

    var products = Object.keys(daysSoldMap).map(function(key) {
        return {
            name: key,
            days: Number(daysSoldMap[key])
        }
    });

    console.log(products);
    var sortedProducts = products.sort(function(p1, p2) {
        return p2.days - p1.days;
    });
    var regulars = [];
    for (var i = 0; i < sortedProducts.length; i++) {
        if (sortedProducts[i].days === sortedProducts[0].days) {
            regulars.push(sortedProducts[i]);
        }
    };

    var maxValue = 0; // assuming positive numbers only
    for (var key in daysSoldMap) {
        if (daysSoldMap[key] > maxValue) {
            maxValue = daysSoldMap[key];
        }
    }
    return regulars;
};

//Least regular sales

exports.returnsLeastRegularSales = function(daysSoldMap) {
    var products = [];
    var products = Object.keys(daysSoldMap).map(function(key) {
        return {
            name: key,
            days: Number(daysSoldMap[key])
        }
    });

    //let's sort the list descending on days for each product
    var sortedProducts = products.sort(function(p1, p2) {
        return p1.days - p2.days;
    });

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
};


//subtracts the 2 given objects and gives difference
exports.returnsStockLevels = function(stockMap, productsSoldMap) {
    var stockLevels = {};
    for (var key in stockMap) {
        stockLevels[key] =  productsSoldMap[key] - stockMap[key];
    }
    return stockLevels;
};
