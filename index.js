window.scrollTo({ top: 0, behavior: 'smooth' });
$(document).ready(function(){

});

$('.left-nav-link').each(function(){
  var currentPages = $(this).find('.w--current').length;
  if (currentPages > 0) {
    $(this).find('.left-nav-dropdown').removeClass('closed');
    $(this).find('.left-nav-link-toggle').addClass('w--current');
  }
});

$(document).on('click', '*[data-tab]', function() {
    var tabClicked = $(this),
    tabTitle = $(this).attr('data-tab'),
    tabTarget = $('.w-tab-menu *[data-w-tab="' + tabTitle + '"]');
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $(tabTarget).triggerHandler('click');
    
    if ($(this).hasClass('supplier-window-tab')) {
      $('.supplier-window').animate({scrollTop: '0px'}, 200);
    }
});

$('.collapse-icon').on('click', function(){
	$('.left-navigation').toggleClass('closed');
  $('.left-header-container').toggleClass('closed');
});

$('.filter-collapse').on('click', function(){
	$('.shop-left').toggleClass('closed');
  $(this).toggleClass('closed');
});

$('[data-dropdown="toggle"]').on('click', function(){
  var toggle = $(this),
    parent = $(this).parents('[data-dropdown="parent"]').first(),
    arrow = parent.find('[data-dropdown="arrow"]').first(),
    list = $(this).parents('[data-dropdown="parent"]').first().find('[data-dropdown="menu"]').first();
  
  var screenWidth = $(window).width();
  
  if (toggle.hasClass('user-menu-toggle') && screenWidth < 991 ) {
    toggleMobileMenu();
    return;
  }
  if (list.hasClass('closed')) {
    var curHeight = list.height(),
        autoHeight = list.css('height', 'auto').outerHeight();
    list.css('height', '0');
    arrow.addClass('rotate');
    list.animate({
      height: autoHeight
    }, 200, function(){
      list.removeClass('closed').css('height', '');
    });
  }
  else {
    var curHeight = list.height();
    arrow.removeClass('rotate');
    list.animate({
      height: 0
    }, 200, function(){
      list.addClass('closed').css('height', '');
    });
  }
});

$('[data-mouseout="dropdown"]').mouseleave(function(){
  var parent = $(this);
  var dropdown = $(this).find('[data-dropdown="menu"]');
  if (dropdown.hasClass('closed'))
    return;
	$(this).find('[data-dropdown="toggle"]').trigger('click');
});

$('[data-tooltip="sibling"]').hover(function(){
  $(this).siblings('.tooltip-box').fadeIn(50);
  }, function(){
  $(this).siblings('.tooltip-box').fadeOut(50);
});


$('[data-toggle="parent"]').on('click', function(){
  var toggleParent = $(this);
  var toggleWrapper = $(this).find('[data-toggle="wrapper"]');
  var toggleButton = $(this).find('[data-toggle="button"]');
  
  toggleParent.toggleClass('on');
  toggleWrapper.toggleClass('on');
  toggleButton.toggleClass('on');
});

$('[data-toggle="label"]').on('click', function(){
  $(this).siblings('[data-toggle="parent"]').trigger('click');
});




////////////////// FUNCTIONS & CUSTOM EVENTS ////////////////////////////

$(document).bind("addToCart",function(e){
   $('.supplier-window-loader').fadeIn(200).delay(1500).fadeOut(100, function(){
    $('.footer-alert').removeClass('closed').delay(4000).queue(function(next){
        $(this).addClass("closed");
        next();
    });
  });
});


function toggleMobileMenu(){
  var toggle = $('.user-menu-toggle'),
    parent = toggle.parent('[data-dropdown="parent"]'),
    arrow = parent.find('[data-dropdown="arrow"]').first(),
    list = $('.mobile-menu');
  if (list.hasClass('closed')) {
    var curHeight = list.height(),
        autoHeight = list.css('height', 'auto').outerHeight();
    list.css('height', '0');
    arrow.addClass('rotate');
    list.animate({
      height: autoHeight
    }, 200, function(){
      list.removeClass('closed').css('height', '');
    });
  }
  else {
    var curHeight = list.height();
    arrow.removeClass('rotate');
    list.animate({
      height: 0
    }, 200, function(){
      list.addClass('closed').css('height', '');
    });
  }
}


