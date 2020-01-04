$(document).ready(function() {
    $(window).scroll( function(){
        addElementViewportEffect('.history-body');
    });


    $('#vrijednosti-btn').on('click',function (e) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#vrijednosti-checkpoint").offset().top - 100
        }, 1000);
    });
    $('#povijest-btn').on('click',function (e) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#povijest-checkpoint").offset().top - 100
        }, 1000);
    });
    $('#grupa-btn').on('click',function (e) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#grupa-checkpoint").offset().top - 100
        }, 1000);
    });
    $('#location-btn').on('click',function (e) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#location-checkpoint").offset().top -100
        }, 1000);
    });
});


function addElementViewportEffect(element){
    $(element).each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it it */
        if( bottom_of_window > bottom_of_object ){

            $(this).animate({'opacity':'1'},500);
        }
    });
}