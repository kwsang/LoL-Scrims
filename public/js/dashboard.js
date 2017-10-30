$('#addPlayer').click(function () {
    var playersNav = document.getElementById('player-nav');
    var username = document.getElementById('inputUsername').value;
    var player = document.createElement('li');
    player.appendChild(document.createTextNode(username));
    playersNav.appendChild(player);

});

function addPlayer() {
    var playersNav = document.getElementById('player-nav');
    var username = document.getElementById('inputUsername').value;
    var player = document.createElement('li');
    player.appendChild(document.createTextNode(username));
    playersNav.appendChild(player);
    $('inputUsername').reset();
}