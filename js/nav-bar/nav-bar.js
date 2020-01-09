var isShown = false;
var firstTimeLoad = true;
var nav_container =$('.navigation-container');
var nav_buttons = $('.navigation-left');
var nav_right = $('.nav-item-r');

$('html').click(function() {
    console.log(window.innerWidth, window.innerHeight);
    if(window.innerWidth < 1200){
        isShown = false;
        if (!firstTimeLoad) {
            nav_container.removeClass('nav-bar-animate-in');
            nav_container.addClass('nav-bar-animate-out');
            nav_buttons.css('display', 'none');
        }
        firstTimeLoad = false;
    }
});

nav_container.click(function(event){
    console.log($(this).width(), 'yeet');
    if(window.innerWidth < 1200){
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
    }
});

$(window).resize(function(){
    console.log('yeet');
    if(window.innerWidth > 1200){
        nav_buttons.css('display', 'grid');
    }
    else{
        nav_buttons.css('display', 'none');
    }

});