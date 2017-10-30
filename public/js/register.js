document.getElementById('register-submit').addEventListener('click', function () {
    var auth = firebase.auth();
    // pull user inputed strings from doc elements
    var username_input = document.getElementById('inputUsername');
    var username = username_input.value;
    var email_input = document.getElementById('inputEmail');
    var email = email_input.value;
    var password_input = document.getElementById('inputPassword');
    var password = password_input.value;
    var confirm_password_input = document.getElementById('confirmPassword');
    var confirm_password = confirm_password_input.value;

    // create new user in firebase auth
    var registerPromise = auth.createUserWithEmailAndPassword(email, confirm_password);
    registerPromise.then(function (user) {
        user.sendEmailVerification();
        alert("An email verification was sent to " + email + ".", 5000);
        window.location.replace("index");
        var userUpdates = {};
        userUpdates['/users/' + user.uid + '/username'] = username;
        userUpdates['/users/' + user.uid + '/email'] = email;
        userUpdates['/players/' + username + '/exists'] = 'true';
        /*
        var userRef = database.ref("users/" + user.uid);
        userRef.set({
            username: username,
            email: email
        });
        */
        database.ref().update(userUpdates);
    }).catch(function (registerError) {
        alert(registerError.message);
    });
});

$('#inputPassword, #confirmPassword').on('keyup', function () {
    if ($('#inputPassword').val() == $('#confirmPassword').val()) {
        $('#confirmPassword').css('bgcolor', '#84ccc5');
    } else {
        $('#confirmPassword').css('bgcolor', '#ff8d8d');
    }
});