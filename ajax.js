var xhr = new XMLHttpRequest();
//callback the code the browser will run

xhr.onreadystatechange = function() {
    //0 no interaction when created to 3 when coming and 4 when ready
    //1 connected to server
    //2 server has recieved request
    //3 started processing
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            document.getElementById('ajax').innerHTML = JSON.parse(xhr.responseText);
        } else if (xhr.status === 404) {
            //not found
        } else if (xhr.status === 500) {
            //server problem
            //statusText
        }
    };
};
//generate json from server
xhr.open('GET', 'products.handlebars');
//send the results to view
xhr.send();