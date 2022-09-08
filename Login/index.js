$(document).ready(function(){
    $("#wf-form-Login-Form").validate();
});

$('#login').on('click', function() {
    var email = $('#Email').val();
    console.log(email + ' is trying to login.');
});

function loginFirebaseUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, 'yellowstone')
        .then((userCredential) => {
        // Signed in
        console.log('User is logged into Firebase.')
        window.location.replace('/app/dashboard');
        })
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        });
}