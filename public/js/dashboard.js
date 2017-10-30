$('#addPlayer').click(function () {
    var playersNav = document.getElementById('player-nav');
    var username = document.getElementById('inputUsername').value;
    var player = document.createElement('li');
    player.appendChild(document.createTextNode(username));
    playersNav.appendChild(player);
    var auth = firebase.auth();
    var user = auth.currentUser;
    if (user) {
        var playerData = {};
        playerData['/users/' + user.uid + '/players/' + username] = 'true';
        playerData['/players/' + username + '/exists'] = 'true';
        database.ref().update(playerData);
    }
    // clear player field after adding
    $('input[name=inputUsername').val('');
});