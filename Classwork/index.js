$(document).on('pageReady', function(){
    $('.timeline-wrapper').animate({scrollLeft: ( ($('#week5').position().left) - 75 )}, 1000);
});

$(document).on('cohortData', function(){
    getCoursework(cohort.classroom_id, user.token);
});

function getCoursework(courseId, accessToken) {
    // https://classroom.googleapis.com/v1/courses?teacherId=me
    const url = `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`;
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };
    let coursework = [];
    fetch(url, options)
        .then(response => {
            return response.json();
        }).then(json => {
            for (let i = 0; i < json.courseWork.length ; i++) {
                const cw = {
                    id: json.courseWork[i].id,
                    title: json.courseWork[i].title,
                    dueDate: json.courseWork[i].dueDate,
                    category: json.courseWork[i].gradeCategory.name
                }
                coursework[cw.id] = cw;
            }
        });
    console.log(coursework);
    return coursework;
}