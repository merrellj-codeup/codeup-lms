$(document).ready(function(){
  
});

$(document).on('cohortData', function(){
  $('#cohort_status').find('.grid-box-quantifier').first().text( (cohort.status && cohort.status) );
});

$(document).on('pageReady', function(){
});