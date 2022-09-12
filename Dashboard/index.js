$(document).ready(function(){
  
});

$(document).on('cohortData', function(){
  if (cohort.status) {
    $('#cohort_status').find('.grid-box-quantifier').first().text( cohort.status );
    if (cohort.status === "active") {
      $('#cohort_status').find('.grid-box-quantifier').first().addClass('green');
    }
  }
});

$(document).on('pageReady', function(){
});