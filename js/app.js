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


    var div =$('section.photo');
    //the url below was generates by flickr api
    var urlPage1 = "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=f7b675897915d732843be51dc236ab7c&group_id=564487%40N23&page=1&format=json&nojsoncallback=1&auth_token=72157679998988820-d935810cdcdc0511&api_sig=2bb41404b537f6b1735dab88209839f8";
    var urlPage2 ="https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=f7b675897915d732843be51dc236ab7c&group_id=564487%40N23&page=2&format=json&nojsoncallback=1&auth_token=72157679998988820-d935810cdcdc0511&api_sig=663d326d6b2680d7eb04c41188e75def";
    var urlPage3 = "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=f7b675897915d732843be51dc236ab7c&group_id=564487%40N23&page=3&format=json&nojsoncallback=1&auth_token=72157679998988820-d935810cdcdc0511&api_sig=0f2db8a7f8543fff31957a873670d8fc";
    var ulrPage4 = "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=3f0cf76cdb758cb809a3fc847d802e1a&group_id=564487%40N23&page=4&format=json&nojsoncallback=1&auth_token=72157681616789316-e4c70c5467721b49&api_sig=c0591cf8253a31ca337b21546849760e";
    var ulrPage5 = "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=3f0cf76cdb758cb809a3fc847d802e1a&group_id=564487%40N23&page=5&format=json&nojsoncallback=1&auth_token=72157681616789316-e4c70c5467721b49&api_sig=f004f0c409f74393246abf36184ea910";
    var ulrPage6 = "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=3f0cf76cdb758cb809a3fc847d802e1a&group_id=564487%40N23&page=6&format=json&nojsoncallback=1&auth_token=72157681616789316-e4c70c5467721b49&api_sig=821cef9ffbc7b5c85ea5565b9ae4004e";
    var ulrPage7 = "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=3f0cf76cdb758cb809a3fc847d802e1a&group_id=564487%40N23&page=7&format=json&nojsoncallback=1&auth_token=72157681616789316-e4c70c5467721b49&api_sig=d269cbcab95e3ebc902e06af438ec4e0";
    var ulrPage8 = "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=3f0cf76cdb758cb809a3fc847d802e1a&group_id=564487%40N23&page=8&format=json&nojsoncallback=1&auth_token=72157681616789316-e4c70c5467721b49&api_sig=4d5e1e6b052f620682ccb8b3ac712307";
    var ulrPage9 ="https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=3f0cf76cdb758cb809a3fc847d802e1a&group_id=564487%40N23&page=9&format=json&nojsoncallback=1&auth_token=72157681616789316-e4c70c5467721b49&api_sig=fb30c361ba49d14ba0edc504dd0d2308";
    var ulrPage10 = "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=3f0cf76cdb758cb809a3fc847d802e1a&group_id=564487%40N23&page=10&format=json&nojsoncallback=1&auth_token=72157681616789316-e4c70c5467721b49&api_sig=ca2d56c321f6047310da6eedc40bac6b";
    var ulrPage11 = "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=3f0cf76cdb758cb809a3fc847d802e1a&group_id=564487%40N23&page=11&format=json&nojsoncallback=1&auth_token=72157681616789316-e4c70c5467721b49&api_sig=a8282053933532a23832988617f49325";
    var ulrPage12 = "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=3f0cf76cdb758cb809a3fc847d802e1a&group_id=564487%40N23&page=12&format=json&nojsoncallback=1&auth_token=72157681616789316-e4c70c5467721b49&api_sig=18c53eb7a9c928abfe3f01e72d50d3af";

    function insertPhotoWithQuote(photos) {
        var $columnLeft = $('.left');
        var $columnMiddle = $('.middle');
        var $columnRight = $('.right');


        $.each(photos, function (index, photo) {
            console.log(index, photo);
            var url = photo.url_o;
            var $img = $('<img>').attr('src', url);
            var $addPhoto = $('<div>', {'class': 'bottomSpace'}).append($img);
            if (index < 34) {
                console.log(url);
                $columnLeft.append($addPhoto);
            } else if ( index < 68) {
                $columnMiddle.append($addPhoto);
            } else {
                $columnRight.append($addPhoto);
            }


        });
    }




    $.ajax({
        url: "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=3f0cf76cdb758cb809a3fc847d802e1a&group_id=564487%40N23&extras=path_alias%2C+url_sq%2C+url_t%2C+url_s%2C+url_q%2C+url_m%2C+url_n%2C+url_z%2C+url_c%2C+url_l%2C+url_o&per_page=&page=1&format=json&nojsoncallback=1&auth_token=72157681616789316-e4c70c5467721b49&api_sig=1e4496cdf9554c16064a9274ff2efc69"
    }).done(function (response) {
        console.log(response.photos.photo);
        insertPhotoWithQuote(response.photos.photo);

    }).fail(function (error) {
        console.log(error);
    });


});
//
// "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=f7b675897915d732843be51dc236ab7c&group_id=564487%40N23&format=json&nojsoncallback=1&auth_token=72157679998988820-d935810cdcdc0511&api_sig=e4176fcc4b262852f25830e50e7f6dc1";
// "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=f7b675897915d732843be51dc236ab7c&group_id=564487%40N23&page=2&format=json&nojsoncallback=1&auth_token=72157679998988820-d935810cdcdc0511&api_sig=663d326d6b2680d7eb04c41188e75def
// "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=f7b675897915d732843be51dc236ab7c&group_id=564487%40N23&page=3&format=json&nojsoncallback=1&auth_token=72157679998988820-d935810cdcdc0511&api_sig=0f2db8a7f8543fff31957a873670d8fc