$(function () {
    // $(window).load(function(){
    //     $('#preloader').fadeOut('slow',function(){$(this).remove();});
    // });
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
                $nav.removeClass('hidden').columnMiddle('navigationOpen');
                // $nav.toggleClass('hidden').removeClass('navigationClose');
            } else if ($nav.hasClass('navigationOpen')){
                $nav.removeClass('navigationOpen');
                $nav.columnMiddle('navigationClose');
            } else {
                $nav.removeClass('navigationClose');
                $nav.columnMiddle('navigationOpen');
            }

            $links.fadeToggle(1000);
        });
    }
    navigationMenuAnimate();



    //flickr-Api
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
            // console.log(index, photo.tags);
            var url = photo.url_o;
            // console.log(url);
            var tags = photo.tags;
            // console.log(tags);
            var $img = $('<img>').attr('src', url).data('tags', tags);
            // console.log($img.data('tags')); // prints tags
            var $addPhoto = $('<div>', {'class': 'bottomSpace'}).append($img);

            var favouriteStar = $('<i>', { 'class':'fa fa-star fa-2x favouriteStar'}, { 'aria-hidden':'true' }).css('position', 'absolute'); // heart font
            // var favouriteStar = $('<button>', { 'class': 'favouriteStar'}).append(heart).css('position', 'absolute'); // heart font onside submit button

            $addPhoto.append(favouriteStar);

            if (index < 170) {
                // console.log(url);
                columnLeft.append($addPhoto);
            } else if (index < 340) {
                columnMiddle.append($addPhoto);
            } else {
                columnRight.append($addPhoto);
            }
            // $(window).load(function() { // czekamy, aż załaduje się cała strona
            //     $('#status').fadeOut(); // efekt zanikania animowanej grafiki
            //     $('#preloader').delay(350).fadeOut('slow'); // efekt zanikania warstwy zakrywającej stronę
            //     $('body').delay(350).css({'overflow':'visible'}); // dopóki nasz div#preloader jest widoczny nie ma możliwości przewijania strony
            // });
        });

        function saveFavourites() {
            var fav ='';
            var saved = $('i.favouriteStar');
            if ( !localStorage.getItem('favs') ){
                var favs = [];
                console.log('pusto');
            } else {
                var favs = JSON.parse( localStorage.getItem('favs') );
                localStorage.removeItem("favs");
                console.log(favs, 'tutaj');
            }
            $('div.bottomSpace').on('click', 'i.favouriteStar', function () {
                starWithFavourites.addClass('saved');
                $(this).addClass('rotate-scale-up').addClass('saved');
                fav = $(this).prev().attr('src');
                if ( favs.indexOf(fav) < 0) {
                    favs.push(fav);
                    localStorage.setItem( 'favs', JSON.stringify( favs ));
                    console.log(JSON.parse(localStorage.getItem('favs')));
                }

                starWithFavourites.on('click', function () {
                    // localStorage.removeItem("favs");
                    starWithFavourites.removeClass('saved');
                    saved.removeClass('saved');
                    var favs = JSON.parse( localStorage.getItem('favs') );
                    // localStorage.removeItem("favs");
                    localStorage.removeItem(JSON.parse(localStorage.getItem('favs')));
                    console.log(favs);
                })
            });




            // $('i.fa.fa-star-o.fa-2x').on('click',function () {
            //     $(this).
            //
            // })

        }
//         //Pobierać:
//         if ( !localStorage.get('favs') ){
//             var favs = [];
//         } else {
//             var favs = JSON.parse( localStorage.get('favs') );
//         }
// //Zapisywać:
//         favs to są ulubione
//         localStorage.set( 'favs', JSON.stringify( favs ) );
        saveFavourites();


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
        findPhotoWithTag();
        // var test = { one: "thing", two: "thing2", three: [0, 2, 44] };
        // var test2 = { 1: "hmhmhm"};
        // var test3 = { kupa: "jeża"};
        //
        // localStorage.setItem("test", JSON.stringify(test));
        // localStorage.setItem("test2", JSON.stringify(test2));
        // localStorage.setItem("test3", JSON.stringify(test3));
        // // var test2 = localStorage.getItem("test");
        // console.log(localStorage["test2"]); //Logs "{"test":"thing","test2":"thing2","test3":[0,2,44]}"


    }

    $.ajax({
        url: "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=831f64fdf59ecfa7a52f1d3cb90087c5&group_id=564487%40N23&extras=tags%2Curl_o&per_page=500&page=1&format=json&nojsoncallback=1"
    }).done(function (response) {
        console.log(response);

        insertPhotoWithQuote(response.photos.photo);

    }).fail(function (error) {
        console.log(error);
    });
});
