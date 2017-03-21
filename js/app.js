$(function () {
    console.log('DOM działa');
    var $links = $('section.links');
    var $hamburger = $('a.menu-overlay');

    var $topLineHamburger =$('p.menu-overlay-line.one');
    var $middleLineHamburger =$('p.menu-overlay-line.two');
    var $bottomLineHamburger =$('p.menu-overlay-line.three');

    var $nav = $('nav.navigation');

    // $('.clickme').on('click', function(){
    //
    //     $middleLineHamburger.toggleClass('hidden');
    //     $topLineHamburger.toggleClass('transform-line1').toggleClass('redCloseButton');
    //     $bottomLineHamburger.toggleClass('transform-line3').toggleClass('redCloseButton');
    //
    //     if($('#moveme').hasClass('marginleft260')){
    //         $('#moveme').animate({
    //             marginLeft: "-=260px",
    //         }, 5000, function() {
    //             $(this).removeClass('marginleft260');
    //         });
    //     }else{
    //         $('#moveme').animate({
    //             marginLeft: "+=260px",
    //         }, 5000, function() {
    //             $(this).addClass('marginleft260');
    //         });
    //     }
    // });





    $hamburger.on('click', function () {
        $middleLineHamburger.toggleClass('hidden');
        $topLineHamburger.toggleClass('transform-line1').toggleClass('redCloseButton');
        $bottomLineHamburger.toggleClass('transform-line3').toggleClass('redCloseButton');


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

        $links.toggleClass('hidden');
    });
});