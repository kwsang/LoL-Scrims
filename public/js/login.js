document.getElementById('login-submit').addEventListener('click', function () {
    var email_input = document.getElementById('inputEmail');
    var email = email_input.value;
    var password_input = document.getElementById('inputPassword');
    var password = password_input.value;

    if ($('#inputEmail').val() != '' && $('#inputPassword').val() != '') {
        // get login promise from database auth
        var loginPromise = auth.signInWithEmailAndPassword(email, password);
        loginPromise.catch(function (error) {
            console.log(error);
        });
        loginPromise.then(function () {
            console.log("logged in");
            window.location.replace("index");
        });
    }
});