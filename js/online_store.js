
function mySearchFunction() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('mySearchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myItemsUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h4")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

if (typeof(Storage) === "undefined") {
    alert('Sorry! No Web Storage support');
}

function LogoutSession() {
    sessionStorage.setItem("LoginStatus", "false");
    sessionStorage.setItem("MyCart", null);
}

function LoginSession() {
    sessionStorage.setItem("LoginStatus", "true");

    var myCart = {
        "items": [],
        "courier": 0.00,
        "subtotal": 0.00,
        "vat": 0.00,
        "discount": 0.00,
        "total": 0.00,
        "name": null,
        "mobile": null,
        "delivery": null,
        "address": null,
        "coupon": null
    };
    var myCartStr = JSON.stringify(myCart);

    sessionStorage.setItem("MyCart", myCartStr);
    alert('Login successful');
}

function CheckSession() {
    if (sessionStorage.getItem("LoginStatus") === "false"
        || sessionStorage.getItem("LoginStatus") === undefined
        || sessionStorage.getItem("LoginStatus") === null){
        return false;
    } else {
        return true;
    }
}

function AddChartReturnValueClear() {
    sessionStorage.setItem("AddChartReturn", "false");
}

function AddItemToCart(item, amount) {
    var new_item = {
        item: item,
        amount: amount
    };

    var myCartStr = sessionStorage.MyCart;
    var myCart = JSON.parse(myCartStr);

    myCart["items"].push(new_item);

    //myCart["courier"] = 0.00;
    //myCart["discount"] = 0.00;

    myCart["subtotal"] = myCart["subtotal"] + new_item["amount"];
    myCart["vat"] = myCart["vat"] + (new_item["amount"] * 0.15);
    myCart["total"] = myCart["subtotal"] + myCart["vat"];

    //alert(JSON.stringify(myCart));
    message_total = "Your current Amount due is R" + myCart["total"];
    alert(message_total);

    sessionStorage.setItem("AddChartReturn", "true");
    myCartStr = JSON.stringify(myCart);
    sessionStorage.setItem("MyCart", myCartStr);
}

function DisplayCartlnfo() {
    var myCartStr = sessionStorage.MyCart;
    var myCart = JSON.parse(myCartStr);

    var new_table = "";
    //alert(myCart["name"]);
    if (myCart["name"] !== null){
        var name = "<tr><td><b>Name</b></td><td><b>" + myCart["name"] + "</b></td></tr>";
        new_table += "" + name;
        new_table += "<tr><td></td><td></td></tr>";
    }
    if (myCart["mobile"] !== null){
        var mobile = "<tr><td><b>Mobile</b></td><td><b>" + myCart["mobile"] + "</b></td></tr>";
        new_table += "" + mobile;
        new_table += "<tr><td></td><td></td></tr>";
    }
    if (myCart["delivery"] !== null){
        var delivery = "<tr><td><b>Delivery</b></td><td><b>" + myCart["delivery"] + "</b></td></tr>";
        new_table += "" + delivery;
        new_table += "<tr><td></td><td></td></tr>";
    }
    if (myCart["address"] !== null){
        var address = "<tr><td><b>Address</b></td><td><b>" + myCart["address"] + "</b></td></tr>";
        new_table += "" + address;
        new_table += "<tr><td></td><td></td></tr>";
    }
    if (myCart["coupon"] !== null){
        var coupon = "<tr><td><b>Coupon</b></td><td><b>" + myCart["coupon"] + "</b></td></tr>";
        new_table += "" + coupon;
        new_table += "<tr><td></td><td></td></tr>";
    }

    document.getElementById("cart_list").innerHTML = new_table;


    var new_table2 = "";
    new_table2 += "<tr><th>Items</th><th>Price</th></tr>";

    for (a=0; a < myCart["items"].length; a++) {
        new_table2 += "<tr><td>" + myCart["items"][a].item + "</td><td>R" + myCart["items"][a].amount + "</td></tr>";
    }
    new_table2 += "<tr><td></td><td></td></tr>";

    var subtotal_result = "<tr><td><b>Subtotal</b></td><td><b>R" + myCart["subtotal"] + "</b></td></tr>";
    new_table2 += "" + subtotal_result;
    new_table2 += "<tr><td></td><td></td></tr>";

    var vat_result = "<tr><td>VAT</td><td>R" + myCart["vat"] + "</td></tr>";
    new_table2 += "" + vat_result;
    new_table2 += "<tr><td></td><td></td></tr>";

    var total_result = "<tr><td><b>Total</b></td><td><b>R" + myCart["total"] + "</b></td></tr>";
    new_table2 += "" + total_result;
    new_table2 += "<tr><td></td><td></td></tr>";

    var courier_result = "<tr><td>Courier</td><td>R" + myCart["courier"] + "</td></tr>";
    new_table2 += "" + courier_result;
    var discount_result = "<tr><td>Discount</td><td>- R" + myCart["discount"] + "</td></tr>";
    new_table2 += "" + discount_result;
    new_table2 += "<tr><td></td><td></td></tr>";

    var final_total = myCart["total"] + myCart["courier"] - myCart["discount"];
    var final_total_result = "<tr><td><b>Final Total</b></td><td><b>R" + final_total + "</b></td></tr>";
    new_table2 += "" + final_total_result;
    //alert(new_table2);

    document.getElementById("cart_list2").innerHTML = new_table2;
}

function checkout_detail() {
    var name = document.getElementById("name").value;
    var mobile = document.getElementById("mobile").value;
    var delivery = document.querySelector('input[name=delivery]:checked').value
    var address = document.getElementById("address").value;
    var coupon = document.getElementById("coupon").value;

    var myCartStr = sessionStorage.MyCart;
    var myCart = JSON.parse(myCartStr);

    myCart["name"] = name;
    myCart["mobile"] = mobile;
    myCart["delivery"] = delivery;
    myCart["address"] = address;
    myCart["coupon"] = coupon;

    if (delivery === "Courier") {
        myCart["courier"] = 75.00
    } else {
        myCart["courier"] = 0.00
    }

    if (coupon === "Save100") {
        myCart["discount"] = 100.00
    } else if (coupon === "Save250") {
        myCart["discount"] = 250.00
    } else if (coupon === "Save500") {
        myCart["discount"] = 500.00
    } else {
        myCart["discount"] = 0.00
    }

    myCartStr = JSON.stringify(myCart);
    sessionStorage.setItem("MyCart", myCartStr);
}

function checkout_buy() {

    var your_order = Math.floor((Math.random() * 100) + 1);
    var message = "Order placed: Ref : " + your_order;
    alert(message);

    var myCart = {
        "items": [],
        "courier": 0.00,
        "subtotal": 0.00,
        "vat": 0.00,
        "discount": 0.00,
        "total": 0.00,
        "name": null,
        "mobile": null,
        "delivery": null,
        "address": null,
        "coupon": null
    };
    var myCartStr = JSON.stringify(myCart);

    sessionStorage.setItem("MyCart", myCartStr);
}

var geocoder;
var map;
function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-29.769304, 31.026868);
    var mapOptions = {
        zoom: 17,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function codeAddress() {
    var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function showCalculator() {
    var theCalculatorElement = document.getElementById("theCalculator");
    //alert(theCalculatorElement.style.display);
    if (theCalculatorElement.style.display === "none" || theCalculatorElement.style.display === "") {
        theCalculatorElement.style.display = "block";
    } else {
        theCalculatorElement.style.display = "none";
    }
}

