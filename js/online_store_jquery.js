$(function() {
    // Animation
    $('.myItemsH2').hover(function(){
        $(this).animate({
            fontSize: '35px'
        });
    });

    $('.myItemsPSize').hover(function(){
        $(this).animate({
            fontSize: '20px'
        });
    });

    $('.myItemsPColor').hover(function(){
        $(this).css({
            color: 'black'
        });
    });

    $('.myItemImageSize').hover(function(){
        $(this).animate({
            width: '250px',
            height: '250px'
        });
    });

    $('.myButtonMoreInfo').hover(function(){
        $(this).animate({
            opacity: '0.2'
        });
    });

    $('.myButtonAddItemSize').hover(function(){
        $(this).animate({
            maxHeight: '75px',
            maxWidth: '150px',
            height: '+=50px',
            width: '+=50px',
            fontSize: '+=15px'
        });
    });

    // Chained/Sliding/Hiding/Showing
    //

    $('.teamPics').hover(function(){
        $(this).fadeOut(1000);
        $(this).fadeIn(1000);
        $(this).fadeOut(1000);
        $(this).fadeIn(1000);
    });

    //

    var myContentLayout = $( ".myContentLayoutMove" );
    function runAnimation1() {
        myContentLayout
            .animate({left: '75px'}, 1000)
            .animate({left: '-75px'}, 1000)
            .animate({left: '0px'}, 1000)
    }
    runAnimation1();

    //

    var myContentBackground = $('.myContentBackground');
    var mycolors = ['red',
                    'lightblue',
                    'lightseagreen',
                    'lightcyan',
                    'aliceblue'];
    var current = 0;
    function nextBackground() {
        myContentBackground.css('background-color', mycolors[current = ++current % mycolors.length]);
        setTimeout(nextBackground, 5000);
        if (current === mycolors.length) {
            current = 0;
        }
    }
    setTimeout(nextBackground, 5000);

    //

    function runAnimation4() {
        $('#myPItem1').fadeOut(3000);
        $('#myPItem1').fadeIn(3000);
        $('#myPItem2').fadeOut(5000);
        $('#myPItem2').fadeIn(5000);
        $('#myPItem3').fadeOut(2000);
        $('#myPItem3').fadeIn(2000);
    }
    runAnimation4();

    var myAdvert = $( ".myAdvert" );
    function runAnimation2() {
        myAdvert
            .animate({left: '1000px'}, 2000)
            .animate({top: '-=1350px'}, 2000)
            .animate({left: '210px'}, 2000)
            .animate({top: '-20px'}, 2000)
            .animate({left: '1000px'}, 2000)
            .animate({top: '-=1350px'}, 2000)
            .animate({left: '210px'}, 2000)
            .animate({top: '-20px'}, 2000)
            .animate({left: '1000px'}, 2000)
            .animate({top: '-=1350px'}, 2000)
            .animate({left: '210px'}, 2000)
            .animate({top: '-20px'}, 2000)
            .animate({left: '1000px'}, 2000)
            .animate({top: '-=1350px'}, 2000)
            .animate({left: '210px'}, 2000)
            .animate({top: '-20px'}, 2000);
    }
    runAnimation2();

    //
    // According
    $('.myAccordion').accordion();
    $('h3').click(function(){
        $(this).div().css("display","block");
    },function(){
        $(this).div().css("display","none");
    });

    //


});
