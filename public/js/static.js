var config = {
    apiKey: "AIzaSyD5BUwi0NgVA4nqmPDdUd5TOJnswgtNLno",
    authDomain: "lol-scrims.firebaseapp.com",
    databaseURL: "https://lol-scrims.firebaseio.com",
    projectId: "lol-scrims",
    storageBucket: "lol-scrims.appspot.com",
    messagingSenderId: "368874408638"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
var auth = firebase.auth();
var database = firebase.database();
var user = auth.currentUser;
var uid = user ? user.uid : null;

auth.onAuthStateChanged(function (user) {
    if (user) {
        var uid = auth.currentUser.uid;
        $('#loginNav').hide();
        $('#logoutNav').show();
    } else {
        $('#logoutNav').hide();
        $('#loginNav').show();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    $('#navbar').load('navbar.html');
    $('#footer').load('footer.html');
});

$('#logout').click(function () {
    auth.signOut().then(function () {
        console.log("User successfully signed out.");
    }).catch(function (error) {
        alert(error.message);
    });
});