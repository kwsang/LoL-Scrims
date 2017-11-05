$('#addPlayer').click(function () {
    var username = document.getElementById('inputUsername').value;
    var auth = firebase.auth();
    var user = auth.currentUser;
    if (user) {
        var playerRef = database.ref('players');
        var playerKey = playerRef.push({
            username: username
        });
        var playerData = {};
        playerData['users/' + user.uid + '/players/' + playerKey.key] = 'true';
        database.ref().update(playerData);
    } else {
        addToPlayers(username);
    }
    // clear player field after adding
    $('input[name=inputUsername').val('');
});

document.addEventListener('DOMContentLoaded', function () {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            var uid = user.uid;
            var userRef = database.ref('users/' + uid + '/players');
            // check for child added to user's list of players
            userRef.orderByKey().on('child_added', function (snap) {
                // pull username from player tree using player key
                var playerRef = database.ref('players/' + snap.key + '/username');
                playerRef.once('value').then(function(playersnap) {
                    addToPlayers(playersnap.val());
                })
            });
        }
    });
});

// add player to table of players on dashboard
function addToPlayers(username) {
    if (username != '' && username != null) {
        var playersNav = document.getElementById('player-nav');
        var player = document.createElement('li');
        var playerLink = document.createElement('a');
        playerLink.setAttribute('href', 'javascript:void(0)');
        player.appendChild(playerLink);
        playerLink.appendChild(document.createTextNode(username));
        playersNav.appendChild(player);
    }
}