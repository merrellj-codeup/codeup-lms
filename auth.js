var db =  firebase.firestore();
var publicPages = [
    '/',
    '/auth',
    '/login'
  ];
const user = {
  'uid': null,
  'avatar': null,
  'email': null,
  'first_name': null,
  'last_name': null,
  'active_cohort': null
};
const cohorts = {};
var cohort;

$(document).on('click', '#logout', function(){
    firebase.auth().signOut().then(function() {
        //window.location.replace('https://nova-alliance.gg');
        window.location.replace('https://friction-free-commerce.webflow.io/login');
    }, function(error) {
        // An error happened.
        console.log('Error: ' + error);
    });
});

firebase.auth().onAuthStateChanged((data) => {
  var currentPath = window.location.pathname;
  if (data) {
    // User is signed in
    user.uid = data.uid;
    user.email = data.email;
    getCurrentUserData(user.uid);
  } else {
    // User is signed out
    console.log('User is signed out');
    if (publicPages.includes(currentPath)) {
      
    } else {
      window.location.replace('/');
    }
  }
});

function getCurrentUserData(userID) {
  db.collection("users").where("uid", "==", userID)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            user.uid = doc.data().uid;
            user.avatar = doc.data().avatar;
            user.first_name = doc.data().first_name;
            user.last_name = doc.data().last_name;
            user.email = doc.data().email;
            user.active_cohort = doc.data().active_cohort;
            user.token = doc.data().token;
            user.tokenID = doc.data().tokenID;
        });
        $(document).trigger('userData');
        getCohortData(user.uid);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function getCohortData() {
    db.collection("cohorts")
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              var cohortID = doc.id;
              cohorts[cohortID] = {
                'class_code': doc.data().class_code,
                'type': doc.data().type,
                'status': doc.data().status,
                'classroom_id': doc.data().classroom_id
              };
          });
          $.each(cohorts, function( index, value ) {
            if (index === user.active_cohort) {
                cohort = value;
            }
          });
          getStudents(cohort.classroom_id, user.token);
          //getStudents("545471210641", user.token);
          getCourses(user.token);
          $(document).trigger('cohortData');
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
    });
    
}


function getCourses(token) {
    // https://classroom.googleapis.com/v1/courses?teacherId=me
    const url = "https://classroom.googleapis.com/v1/courses?teacherId=me";
    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    let courseId = -1;
    fetch(url, options)
        .then(response => {
            return response.json();
        }).then(json => {
            courseId = json.courses[0].id;
            // getCourseGrades(courseId, token);
            console.log(json);
            return courseId;
        });
}

function getStudents(courseId, token) {
    const url = `https://classroom.googleapis.com/v1/courses/${courseId}/students`;
    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    let students = [];
    fetch(url, options)
        .then(response => {
            return response.json();
        }).then(json => {
            for (let i = 0; i < json.students.length; i++) {
                const student = {
                    id: json.students[i].profile.id,
                    name: json.students[i].profile.name
                }
                students[student.id] = student;
                console.log(students);
            }
        });
    return students;
}