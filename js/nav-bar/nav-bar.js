var isShown = false;
var firstTimeLoad = true;
var nav_container =$('.navigation-container');
var nav_buttons = $('.navigation-left');

$('html').click(function() {
    isShown = false;
if (!firstTimeLoad) {
    nav_container.removeClass('nav-bar-animate-in');
    nav_container.addClass('nav-bar-animate-out');
    nav_buttons.css('display', 'none');
}
firstTimeLoad = false;
});

$('.navigation-container').click(function(event){
    console.log($(this).width(), 'yeet');

    if (!isShown){
        nav_container.addClass('nav-bar-animate-in');
        nav_container.removeClass('nav-bar-animate-out');
        nav_buttons.addClass('navigation-left-slidein');
        nav_buttons.css('display', 'grid');
    }
    else {
        nav_container.removeClass('nav-bar-animate-in');
        nav_container.addClass('nav-bar-animate-out');
        nav_buttons.css('display', 'none');
    }
    isShown = !isShown;
    event.stopPropagation();
});