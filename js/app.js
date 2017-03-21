$(function () {
    console.log('DOM działa');
    var $links = $('section.links');
    var $hamburger = $('a.menu-overlay');
    var $topLineHamburger =$('p.one');
    var $middleLineHamburger =$('p.two');
    var $bottomLineHamburger =$('p.three');
    var $nav = $('nav.navigation');
    $hamburger.on('click', function () {
        $middleLineHamburger.toggleClass('hidden');
        $topLineHamburger.toggleClass('.transform-line1').toggleClass('redCloseButton');
        $bottomLineHamburger.toggleClass('.transform-line3').toggleClass('redCloseButton');
        $nav.toggleClass('hidden').toggleClass('navigationAnimate');
        $links.toggleClass('hidden');
    });
});