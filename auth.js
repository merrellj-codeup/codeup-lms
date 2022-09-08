import { getAuth } from "FirebaseAuth";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const publicPages = [
    '/',
    '/auth',
    '/login'
  ];
const user = {
  'uid': null,
  'avatar': null,
  'email': null
};

auth.onAuthStateChanged((data) => {
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
      window.location.replace('/login');
    }
  }
});

function getCurrentUserData(userID) {
  db.collection("users").where("uid", "==", userID)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            user.avatar = doc.data().avatar;
            user.first_name = doc.data().first_name;
            user.last_name = doc.data().last_name;
          
        });
        $(document).trigger('userData');
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

$(document).on('click', '#logout', function(){
  firebase.auth().signOut().then(function() {
    //window.location.replace('https://nova-alliance.gg');
    window.location.replace('/login');
  }, function(error) {
    // An error happened.
    console.log('Error: ' + error);
  });
});
