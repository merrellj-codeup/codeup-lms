$('[data-toggle="parent"]').on('click', function(){
  var toggleParent = $(this);
  var toggleWrapper = $(this).find('[data-toggle="wrapper"]');
  var toggleButton = $(this).find('[data-toggle="button"]');
  
  toggleParent.toggleClass('on');
  toggleWrapper.toggleClass('on');
  toggleButton.toggleClass('on');
});

$('[data-modal]').on('click', function(){
  var modalButton = $(this);
  var targetID = $(this).attr('data-modal');
  var targetModal = $(document).find('*[id="' + targetID + '"]');
  
  $('.fixed-window').addClass('closed');
  targetModal.removeClass('closed');
});

$('[data-select2option]').each(function(){
  var fieldParent = $(this).parent('.select2-field-wrapper');
  var fieldID = $(this).attr('id');
  var select2Type = $(this).attr('data-select2option');
  initializeSelect2( $(this), fieldParent);
});

$('[data-datepicker]').each(function(){
  var fieldParent = $(this).parent('.date-field-wrapper');
  var fieldID = $(this).attr('name');
  var datePickerType = $(this).attr('data-select2option');
  $('#'+ fieldID).datepicker();
});

$('[data-phonefield]').each(function(){
  var fieldParent = $(this).parent('.date-field-wrapper');
  var fieldID = $(this).attr('name');
  $('#'+ fieldID).mask('(999) 999-9999');
});

$('.cat-dropdown').on('click', function(){
  $('.cat-dropdown').removeClass('active');
  $(this).addClass('active');
});

$('.form-step-next').on('click', function(){
  var currentTab = $(this).parents('.w-tab-pane').attr('data-w-tab');
  var currentMenuLink = $(this).parents('.w-tabs').find('.w-tab-link[data-w-tab="' + currentTab + '"]');
  
  currentMenuLink.next().triggerHandler('click');
});

$('.form-step-back').on('click', function(){
  var currentTab = $(this).parents('.w-tab-pane').attr('data-w-tab');
  var currentMenuLink = $(this).parents('.w-tabs').find('.w-tab-link[data-w-tab="' + currentTab + '"]');
  
  currentMenuLink.prev().triggerHandler('click');
});

$('.field-state-write').css('display', 'grid').hide();
$('*[data-multistate]').on('click', function(){
  var action = $(this).attr('data-multistate');
  var parent = $(this).parents('.field-multistate-wrapper').first();
  switch (action) {
    case "edit":
      parent.children('.field-state-read').css('display', 'flex').hide();
      parent.children('.field-state-write').css('display', 'grid').hide().show();
      parent.children('.field-state-read').first().find('*[data-multistate-field-id]').each(function(){
        var fieldID = $(this).attr('data-multistate-field-id');
        var fieldText = $(this).text();
        $('.field-state-write *[data-multistate-field-id="' + fieldID + '"]').val(fieldText);
      });
      break;
    case "save":
      parent.children('.field-state-read').css('display', 'flex').hide().show();
      parent.children('.field-state-write').css('display', 'grid').hide();
      parent.children('.field-state-write').first().find('*[data-multistate-field-id]').each(function(){
        var fieldID = $(this).attr('data-multistate-field-id');
        var fieldText = $(this).val();
        $('.field-read-only-text[data-multistate-field-id="' + fieldID + '"]').text(fieldText);
      });
      break;
  }
});

function initializeSelect2(selectElementObj, fieldParent) {
    selectElementObj.select2({
      placeholder: 'Select ...',
      dropdownParent: fieldParent
    });
}