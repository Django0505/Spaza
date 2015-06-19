var xhr = new XMLHttpRequest();
//callback the code the browser will run

xhr.onreadystatechange = function() {
    //0 when created to 3 when coming and 4 when ready
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            document.getElementById('ajax').innerHTML = xhr.responseText;
        } else if (xhr.status === 404) {
            //not found
        } else if (xhr.status === 500) {
            //server problem
            //statusText
        }
    };
};

xhr.open('GET', 'products.handlebars');
xhr.send();