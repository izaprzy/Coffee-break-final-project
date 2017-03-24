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

    var closeButton = $('i.fa.fa-times');
    var div = $('section.photo');
    var form = $('form.search');
    var input = form.find('input');
    var resultsNumber = $('span.resultsNumber');
    // console.log(resultsNumber);

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

            var favouriteHeart = $('<i>', { 'class':'fa fa-heart fa-2x favouriteHeart'}, { 'aria-hidden':'true' }).css('position', 'absolute'); // heart font
            // var favouriteHeart = $('<button>', { 'class': 'favouriteHeart'}).append(heart).css('position', 'absolute'); // heart font onside submit button

            $addPhoto.append(favouriteHeart);

            if (index < 80) {
                // console.log(url);
                columnLeft.append($addPhoto);
            } else if (index < 175) {
                columnMiddle.append($addPhoto);
            } else {
                columnRight.append($addPhoto);
            }

        });

        function saveFavourites() {
            var fav;
            if ( !localStorage.getItem('favs') ){
                var favs = [];
            } else {
                var favs = JSON.parse( localStorage.getItem('favs') );
            }
            $('div.bottomSpace').on('click', 'i.favouriteHeart', function () {
                console.log($(this).prev().attr('src'));
                fav = $(this).prev().attr('src');
                favs.push(fav);
                localStorage.setItem("favs", JSON.stringify(favs));
                var test = JSON.stringify(favs);
                console.log(test);
            });


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
                var tag = input.val();
                var counter = 0;
                $('img').each(function() {
                    if ( $(this).hasClass('hidden') ) { // before searching I make visible all images
                        $(this).removeClass('hidden');
                    }
                    if ( !tag ) { // if user didnt put any tag
                        resultsNumber.text('no tag suggestion').addClass('warning');
                    } else if ( $(this).data('tags').indexOf(tag) < 0 ) {
                        counter++;
                        $(this).addClass('hidden');
                        var number = 250 - counter;
                        resultsNumber.text('You have ' + number + ' results');
                    }
                })
            });
        }

        var test = { test: "thing", test2: "thing2", test3: [0, 2, 44] };
        localStorage.setItem("test", JSON.stringify(test));
        var test2 = localStorage.getItem("test");
        console.log(test2); //Logs "{"test":"thing","test2":"thing2","test3":[0,2,44]}"

        findPhotoWithTag();





    }

    $.ajax({
        url: "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=3a8ae2ce4481865b5e7de17a2fbce311&group_id=564487%40N23&extras=tags%2Curl_o&per_page=250&page=1&format=json&nojsoncallback=1"
    }).done(function (response) {
        console.log(response);
        // console.log(response.photos.photo);

        insertPhotoWithQuote(response.photos.photo);

    }).fail(function (error) {
        console.log(error);
    });
});