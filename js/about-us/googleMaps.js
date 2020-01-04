function myMap() {
    var uluru = {lat: 45.8149579, lng: 15.9449604};
    var mapProp= {
        center: uluru,
        zoom:18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    var marker = new google.maps.Marker({position: uluru, map: map});
}