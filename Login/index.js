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