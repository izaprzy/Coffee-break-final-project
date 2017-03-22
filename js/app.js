$(function () {
    console.log('DOM działa');



    //Main page
    var $links = $('section.links');
    var $hamburger = $('a.menu-overlay');

    var $topLineHamburger =$('p.menu-overlay-line.one');
    var $middleLineHamburger =$('p.menu-overlay-line.two');
    var $bottomLineHamburger =$('p.menu-overlay-line.three');

    var $nav = $('nav.navigation');
    
    function navigationMenuAnimate() {
        $hamburger.on('click', function () {
            $middleLineHamburger.toggleClass('hidden');
            $topLineHamburger.toggleClass('transform-line1').toggleClass('redCloseButton');
            $bottomLineHamburger.toggleClass('transform-line3').toggleClass('redCloseButton');

            //first if - after loading page
            if ( $nav.hasClass('hidden')) {
                $nav.removeClass('hidden').addClass('navigationOpen');
                // $nav.toggleClass('hidden').removeClass('navigationClose');
            } else if ($nav.hasClass('navigationOpen')){
                $nav.removeClass('navigationOpen');
                $nav.addClass('navigationClose');
            } else {
                $nav.removeClass('navigationClose');
                $nav.addClass('navigationOpen');
            }

            $links.fadeToggle(1000);
        });
    }

    navigationMenuAnimate();

    //flickr-Api
    //the url below was generates by flickr api
    var url = "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=f7b675897915d732843be51dc236ab7c&group_id=564487%40N23&format=json&nojsoncallback=1&auth_token=72157679998988820-d935810cdcdc0511&api_sig=e4176fcc4b262852f25830e50e7f6dc1";
    function insertPhotoWithQuote() {
        $.ajax({
            url: url
        }).done(function (response) {
            console.log(response);
            // var background = response.hdurl;
            // $section1.css('background-image', 'url(' + background + ')');
        }).fail(function (error) {
            console.log(error);
        });
    }

    insertPhotoWithQuote();

});