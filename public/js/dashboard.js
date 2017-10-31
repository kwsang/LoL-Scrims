$('#addPlayer').click(function () {
    var username = document.getElementById('inputUsername').value;
    var auth = firebase.auth();
    var user = auth.currentUser;
    if (user) {
        var playerData = {};
        playerData['/users/' + user.uid + '/players/' + username] = 'true';
        playerData['/players/' + username + '/exists'] = 'true';
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
            userRef.orderByKey().on('child_added', function (snap) {
                addToPlayers(snap.key);
            });
        }
    });
});

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

