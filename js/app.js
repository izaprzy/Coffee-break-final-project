$(function () {
    console.log('DOM działa');
    var $links = $('section.links');
    var $hamburger = $('a.menu-overlay');

    var $topLineHamburger =$('p.menu-overlay-line.one');
    var $middleLineHamburger =$('p.menu-overlay-line.two');
    var $bottomLineHamburger =$('p.menu-overlay-line.three');

    var $nav = $('nav.navigation');
    $hamburger.on('click', function () {
        $middleLineHamburger.toggleClass('hidden');
        $topLineHamburger.toggleClass('transform-line1').toggleClass('redCloseButton');
        $bottomLineHamburger.toggleClass('transform-line3').toggleClass('redCloseButton');
        $nav.toggleClass('hidden').toggleClass('navigationOpen');
        $links.toggleClass('hidden');
    });
});