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
    $('#inputUsername').val('');
});

document.addEventListener('DOMContentLoaded', function () {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            var uid = user.uid;
            var userRef = database.ref('users/' + uid + '/players');
            var numPlayers = 1;
            userRef.orderByKey().on('child_added', function (snap) {
                if (snap.val = 'true') {
                    addToPlayers(snap.key, numPlayers);
                    numPlayers++;
                }
            });
        }
    });
});

function addToPlayers(username, numPlayers) {
    if (username != '' && username != null) {
        var playersNav = document.getElementById('player-nav');
        var row = playersNav.insertRow(numPlayers);
        var deleteCell = row.insertCell(0);
        var deleteLink = document.createElement('a');
        deleteLink.setAttribute('href', 'javascript:void(0)');
        deleteLink.setAttribute('class', 'removeLink');
        deleteLink.innerHTML = '<i class="fa fa-times-circle prefix grey-text"></i>';
        deleteCell.appendChild(deleteLink);
        var player = row.insertCell(1);
        player.setAttribute('class', 'username');
        var playerLink = document.createElement('a');
        playerLink.setAttribute('href', 'javascript:void(0)');
        player.appendChild(playerLink);
        playerLink.appendChild(document.createTextNode(username));
    }
}

$(document).on('click', 'a.removeLink', function() {
    const row = $(this).closest('tr');
    const username = row.find('a').text();
    console.log(username);
    row.remove();
    var user = firebase.auth().currentUser;
    var playerRef = database.ref('users/' + user.uid + '/players/' + username);
    playerRef.remove();
    return false;
});