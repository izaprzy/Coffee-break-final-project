$(function () {
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

    //Quots gallery
    var div = $('section.photo');
    var form = $('form.search');
    var input = form.find('input');
    var resultsNumber = $('span.resultsNumber');
    var starWithFavourites = $('i.all-favourites');

    function insertPhotoWithQuote(photos) {
        var columnLeft = $('.left');
        var columnMiddle = $('.middle');
        var columnRight = $('.right');

        $.each(photos, function (index, photo) {
            var url = photo.url_o;
            var tags = photo.tags;
            var $img = $('<img>').attr('src', url).data('tags', tags);
            var $addPhoto = $('<div>', {'class': 'bottomSpace'}).append($img);
            var favouriteStar = $('<i>', { 'class':'fa fa-star fa-2x favouriteStar'}, { 'aria-hidden':'true' }).css('position', 'absolute'); // star font

            $addPhoto.append(favouriteStar);

            if (index < 167) {
                columnLeft.append($addPhoto);
            } else if (index < 334) {
                columnMiddle.append($addPhoto);
            } else {
                columnRight.append($addPhoto);
            }
            $('#preloader').fadeOut('slow',function(){ // after images are loaded, remove preloader
                $(this).remove();
            });
        });

        saveFavourites();
        findPhotoWithTag();
    }

    $.ajax({
        url: "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=831f64fdf59ecfa7a52f1d3cb90087c5&group_id=564487%40N23&extras=tags%2Curl_o&per_page=500&page=1&format=json&nojsoncallback=1"
    }).done(function (response) {
        console.log(response);
        insertPhotoWithQuote(response.photos.photo);
    }).fail(function (error) {
        console.log(error);
    });

    function saveFavourites() {
        var fav ='';
        var saved = $('i.favouriteStar');
        if ( !localStorage.getItem('favs') ){
            var favs = [];
        } else {
            var favs = JSON.parse(localStorage.getItem('favs'));
        }
        $('div.bottomSpace').on('click', '.favouriteStar', function () {
            starWithFavourites.addClass('saved');
            $(this).toggleClass('rotate-scale-up').toggleClass('saved');
            fav = $(this).prev().attr('src');
            if ( favs.indexOf(fav) < 0) {
                favs.push(fav);
                localStorage.setItem( 'favs', JSON.stringify( favs ));
            }
        });

        starWithFavourites.on('click', function () {
            // localStorage.removeItem("favs");
            starWithFavourites.removeClass('saved');
            saved.removeClass('saved');
            var favs = JSON.parse(localStorage.getItem('favs'));
            localStorage.removeItem("favs");
        })
    }

    function findPhotoWithTag() {
        input.on('focus',function () {
            $(this).val('');
        });

        form.on('submit', function (e) {
            e.preventDefault();
            var tag = input.val().toLowerCase();
            var counter = 0;
            $('img').parent().each(function() {
                if ( $(this).hasClass('hidden') ) { // before searching I make visible all images
                    $(this).removeClass('hidden');
                }
                if ( !tag ) { // if user didnt put any tag
                    resultsNumber.text('no tag suggestion');
                } else if ( $(this).children().data('tags').indexOf(tag) < 0 ) {
                    counter++;
                    $(this).addClass('hidden');
                    var number = 500 - counter;
                    resultsNumber.text('You have ' + number + ' results');
                }
                $('html,body').scrollTop(0); // after searching it come back to the top
            })
        });
    }
});