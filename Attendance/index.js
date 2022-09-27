import * as Utils from 'Utils';

let $clickedCalEvent = {};
$(document).ready(function(){
    const ctx = document.getElementById('myChart');
    const DATA_COUNT = 5;
    const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

    const data = {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
            {
            label: 'Dataset 1',
            data: Utils.numbers(NUMBER_CFG),
            backgroundColor: Object.values(Utils.CHART_COLORS),
            }
        ]
    };
    const config = {
        type: 'pie',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
              //display: false
            },
            title: {
              display: false,
              text: 'Chart.js Pie Chart'
            }
          }
        },
    };
    const myChart = new Chart(ctx, config);
});
$(document).on('click', '.cal-saved-status', function(){
    let currentStatus = $(this).text();
    switch(currentStatus){
        case "Start":
            $(this).children('div').text('Unsaved');
            $(this).addClass('unsaved');
            $('[data-save="attendance"]').addClass('cta');
            $(this).siblings('.cal-event').each(function(){
                $(this).append(`
                    <div class="cal-event-status present">P</div>
                `);
            });
            break;
        case "Unsaved":
            break;
        case "Saved":
            break;
    }
});

$(document).on('click', '.cal-event', function(event){
    $clickedCalEvent = $(this);
    let currentStatus = $(this).find('.cal-event-status').text();
    //console.log(event.pageX + ', ' + event.pageY);
    let windowLeft = ( (event.pageX + 200) > $(window).width() ) ? (event.pageX - 200) : event.pageX;
    let windowTop = ( (event.pageY + 245) > $(window).height() ) ? (event.pageY - 245) : event.pageY;
    let attendanceWindow = `
    <div class="attendance-window-container">
        <div class="attendance-window-bg"></div>
        <div class="attendance-status-window" style="top: ${windowTop}px; left: ${windowLeft}px;">
            <div class="attendance-status-window-inner">
                <div class="attendance-status">
                    <div class="cal-event-status present">P</div>
                    <div>Present</div>
                </div>
                <div class="attendance-status">
                    <div class="cal-event-status tardy">T</div>
                    <div>Tardy</div>
                </div>
                <div class="attendance-status">
                    <div class="cal-event-status tardy">H</div>
                    <div>Half-Day</div>
                </div>
                <div class="attendance-status">
                    <div class="cal-event-status tardy">L</div>
                    <div>Left Early</div>
                </div>
                <div class="attendance-status">
                    <div class="cal-event-status absent">A</div>
                    <div>Absent</div>
                </div>
                <div class="attendance-status">
                    <div class="cal-event-status unexcused">UA</div>
                    <div>Unexcused Absence</div>
                </div>
                <div class="attendance-virtual">
                    <div>Virtual?</div>
                    <div data-toggle="parent" class="toggle">
                        <div data-toggle="wrapper" class="toggle-button-wrapper">
                            <div data-toggle="button" class="toggle-button"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    $(attendanceWindow).insertAfter('.main');
});

$(document).on('click', '.attendance-window-bg', function(){
 $('.attendance-window-container').remove();
});

$(document).on('click', '.attendance-status', function(){
    $('[data-save="attendance"]').addClass('cta');
    $clickedCalEvent.parents('.cal-day').find('.cal-saved-status').addClass('unsaved');
    $clickedCalEvent.parents('.cal-day').find('.cal-saved-status').children('div').text('Unsaved');
    let newStatus = $(this).find('.cal-event-status').text();
    let newStatusHTML = " ";
    let isVirtual = $('.attendance-virtual').find('[data-toggle="parent"]').hasClass('on') ? 'V' : '';
    switch (newStatus) {
        case "P":
            newStatusHTML = `
                <div class="cal-event-status present">P${isVirtual}</div>
            `;
            break;
        case "T":
            newStatusHTML = `
                <div class="cal-event-status tardy">T${isVirtual}</div>
            `;
            break;
        case "H":
            newStatusHTML = `
                <div class="cal-event-status tardy">H${isVirtual}</div>
            `;
            break;
        case "L":
            newStatusHTML = `
                <div class="cal-event-status tardy">L${isVirtual}</div>
            `;
            break;
        case "A":
            newStatusHTML = `
                <div class="cal-event-status absent">A</div>
            `;
            break;
        case "UA":
            newStatusHTML = `
                <div class="cal-event-status unexcused">UA</div>
            `;
            break;
    }
    $clickedCalEvent.html(`
        ${newStatusHTML}
    `);
    $('.attendance-window-container').remove();
});

$(document).on('click', '[data-change-week]', function(){
    let direction = $(this).attr('data-change-week');
    let $currentWeek = $('.calendar-week.current');
    switch (direction) {
        case "left":
            console.log('moving week left');
            $currentWeek.prev().removeClass('left');
            $currentWeek.prev().addClass('current');
            $currentWeek.removeClass('current');
            $currentWeek.addClass('right');
            break;
        case "right":
            console.log('moving week right');
            $currentWeek.next().removeClass('right');
            $currentWeek.next().addClass('current');
            $currentWeek.removeClass('current');
            $currentWeek.addClass('left');
            break;
    }
});