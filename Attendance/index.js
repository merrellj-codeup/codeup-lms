$(document).on('click', '.cal-saved-status', function(){
    let currentStatus = $(this).text();
    switch(currentStatus){
        case "Start":
            $(this).children('div').text('Unsaved');
            $(this).addClass('unsaved');
            $('[data-save="attendance"]').addClass('cta');
            $(this).siblings('.cal-event').each(function(){
                $(this).innerHTML(`
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