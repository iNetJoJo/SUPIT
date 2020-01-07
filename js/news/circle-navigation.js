function parseUrl(location){
    let url = window.location.href;
    url = url.slice(0, -9);
    url += location;
    return url;
}


$("#circ-1").click(function () {
    window.location.href = parseUrl('novost-1.html');
});

$("#circ-2").click(function () {
    window.location.href = parseUrl('novost-2.html');
});

$("#circ-3").click(function () {
    window.location.href = parseUrl('novost-2.html');
});