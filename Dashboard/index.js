import * as Utils from 'https://merrellworkspublic.s3.amazonaws.com/masspile/js/Utils.js';

createOpenPos();
createDailyProf();

$(document).ready(function(){
  
});

$(document).on('userData', function(){
  $(document).trigger('pageReady');
});

$(document).on('pageReady', function(){
  $('.timeline-wrapper').animate({scrollLeft: ( ($('#week5').position().left) - 75 )}, 1000);
});

function createOpenPos(){
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: 'Commits Per Day',
        data: Utils.numbers({count: 6, min: 0, max: 50}),
        borderColor: Utils.CHART_COLORS.green,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.green, 0.5),
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15
      }
    ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: false,
          text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
        }
      }
    }
  };

  var openPositions = new Chart(
    $('#myChart'),
    config
  );
}

function createDailyProf(){
  var DATA_COUNT = 30;
  var NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

  var labels = Utils.months({count: 30});
  var data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        stack: 'combined',
        type: 'bar'
      },
      {
        label: 'Dataset 2',
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
        stack: 'combined'
      }
    ]
  };

  var config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false,
          text: 'Chart.js Line Chart'
        }
      },
      scales: {
        y: {
          stacked: true
        }
      }
    },
  };

  var dailyProf = new Chart(
    $('#dailyProf'),
    config
  );
}