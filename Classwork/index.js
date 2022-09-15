$(document).on('pageReady', function(){
    $('.timeline-wrapper').animate({scrollLeft: ( ($('#week5').position().left) - 75 )}, 1000);
});

$(document).on('cohortData', function(){
    getTopics(cohort.classroom_id, user.token);
});

function getTopics(courseId, accessToken) {
    // https://classroom.googleapis.com/v1/courses?teacherId=me
    const url = `https://classroom.googleapis.com/v1/courses/${courseId}/topics`;
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };
    fetch(url, options)
        .then(response => {
            return response.json();
        }).then(json => {
            console.log(json);
        });
}