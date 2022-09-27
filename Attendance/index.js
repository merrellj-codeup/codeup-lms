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

$(document).on('click', '.cal-event', function(){
    let currentStatus = $(this).find('.cal-event-status').text();
    $('[data-save="attendance"]').addClass('cta');
    $(this).parents('.cal-day').find('.cal-saved-status').addClass('unsaved');
    $(this).parents('.cal-day').find('.cal-saved-status').children('div').text('Unsaved');

    let attendanceWindow = `
    <div class="attendance-window-container">
        <div class="attendance-window-bg"></div>
        <div class="attendance-status-window">
            <div class="attendance-status-window-inner">
                <div class="div-block-12">
                    <div class="cal-event-status present">P</div>
                    <div>Present</div>
                </div>
                <div class="div-block-12">
                    <div class="cal-event-status tardy">T</div>
                    <div>Tardy</div>
                </div>
                <div class="div-block-12">
                    <div class="cal-event-status tardy">H</div>
                    <div>Half-Day</div>
                </div>
                <div class="div-block-12">
                    <div class="cal-event-status tardy">L</div>
                    <div>Left Early</div>
                </div>
                <div class="div-block-12">
                    <div class="cal-event-status absent">A</div>
                    <div>Absent</div>
                </div>
                <div class="div-block-12">
                    <div class="cal-event-status unexcused">UA</div>
                    <div>Unexcused Absence</div>
                </div>
                <div class="div-block-12 virtual">
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
    $(attendanceWindow).appendAfter('.main');
});

$(document).on('click', '.attendance-window-bg', function(){
 $('.attendance-window-container').remove();
});