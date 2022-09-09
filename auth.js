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
                'type': doc.data().type
              };
          });
          $(document).trigger('cohortData');
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  }

$(document).on('click', '#logout', function(){
  firebase.auth().signOut().then(function() {
    //window.location.replace('https://nova-alliance.gg');
    window.location.replace('https://friction-free-commerce.webflow.io/login');
  }, function(error) {
    // An error happened.
    console.log('Error: ' + error);
  });
});
