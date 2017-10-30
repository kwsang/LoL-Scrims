var config = {
    apiKey:"AIzaSyD5BUwi0NgVA4nqmPDdUd5TOJnswgtNLno",
    authDomain:"lol-scrims.firebaseapp.com",
    databaseURL:"https://lol-scrims.firebaseio.com",
    projectId:"lol-scrims",
    storageBucket:"lol-scrims.appspot.com",
    messagingSenderId:"368874408638"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

var auth = firebase.auth();
var database = firebase.database();
var user = auth.currentUser;
var uid = user ? user.uid : null;

document.addEventListener('DOMContentLoaded', function () {
    $('#footer').load('footer.html');
    $('#fixed-navbar').load('navbar.html');
});