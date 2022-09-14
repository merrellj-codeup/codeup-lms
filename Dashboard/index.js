$(document).ready(function(){
  
});

$(document).on('cohortData', function(){
  if (cohort.status) {
    $('#cohort_status').find('.grid-box-quantifier').first().text( cohort.status );
    if (cohort.status === "active") {
      $('#cohort_status').find('.grid-box-quantifier').first().addClass('green');
    }
  }
  else {
    $('#cohort_status').find('.grid-box-quantifier').first().text('Unknown');
    $('#cohort_status').find('.grid-box-quantifier').first().addClass('red');
  }
  if (cohort.student_count) {
    $('#studentCount').find('.grid-box-quantifier').first().text( cohort.student_count );
  }
});

$(document).on('pageReady', function(){
});