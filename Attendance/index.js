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
    // switch(currentStatus) {
    //     case "P":
    //         $(this).html(`<div class="cal-event-status present">PV</div>`);
    //         break;
    //     case "PV":
    //         $(this).html(`<div class="cal-event-status tardy">T</div>`);
    //         break;
    //     case "T":
    //         $(this).html(`<div class="cal-event-status tardy">TV</div>`);
    //         break;
    //     case "TV":
    //         $(this).html(`<div class="cal-event-status tardy">H</div>`);
    //         break;
    //     case "H":
    //         $(this).html(`<div class="cal-event-status tardy">HV</div>`);
    //         break;
    //     case "HV":
    //         $(this).html(`<div class="cal-event-status absent">A</div>`);
    //         break;
    //     case "A":
    //         $(this).html(`<div class="cal-event-status unexcused">UA</div>`);
    //         break;
    //     case "UA":
    //         $(this).html(``);
    //         break;
    //     default:
    //         $(this).html(`<div class="cal-event-status present">P</div>`);
    //         break;
    // }
});

$(document).on('click', '.attendance-window-bg', function(){
 $('.attendance-window-container').remove();
});