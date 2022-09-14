var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.students.readonly');



$(document).ready(function(){
    $('#Email').val('jason.merrell@codeup.com');
    $('#password').val('abc123');
});

$('input').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        $('#login').trigger('click');
    }
});

$('#login').on('click', function() {
    var email = $('#Email').val();
    var password = $('#password').val();
    console.log(email + ' is trying to login.');
    loginFirebaseUser('jason.merrell@codeup.com', 'abc123');
});

$('#googleAuth').on('click', function(){
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
        
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
});

function loginFirebaseUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
        // Signed in
        console.log('User is logged into Firebase.')
        window.location.replace('/dashboard');
        })
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        });
}