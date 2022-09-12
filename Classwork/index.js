$(document).on('pageReady', function(){
    $('.timeline-wrapper').animate({scrollLeft: ( ($('#week5').position().left) - 75 )}, 1000);
});