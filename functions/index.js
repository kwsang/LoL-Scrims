// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// CORS Express middleware for CORS requests
const express = require('express');
const cors = require('cors');
let app = express();
app.use(cors());

const request = require('request');

// Pulling RIOT API key from hidden local file
var api_key = '';
const riotAPI = 'https://na1.api.riotgames.com/';
const fs = require('fs');
const apiKeyFile = fs.readFile('api_key.json', 'utf8', function(err, contents) {
  if (err) throw err;
  const parsedJSON = JSON.parse(contents);
  api_key = parsedJSON.key;
});


exports.testPlayer = functions.https.onRequest((req, res) => {
  const leagueAPI = riotAPI + '/lol/league/v3/positions/by-summoner/' + req.query.text + '?api_key=' + api_key;
  request(leagueAPI, function(err, res, body) {
    if (err) {
      res.redirect('/');
    } else if (!err && res.statusCode == 200) {
      const bodyjson = JSON.parse(body);
      const summonerData = {};
      console.log(bodyjson);
      for (var i in bodyjson) {
        console.log(bodyjson[i]);
        const location = (bodyjson[i].queueType == 'RANKED_FLEX_SR') ? 'flex' : ((bodyjson[i].queueType == 'RANKED_SOLO_5x5') ? 'solo' : 'tt');
        summonerData['ranked/' + location + '/wins'] = bodyjson[i].wins;
        summonerData['ranked/' + location + '/losses'] = bodyjson[i].losses;
        summonerData['ranked/' + location + '/rank'] = bodyjson[i].tier + bodyjson[i].rank + bodyjson[i].leaguePoints;
        summonerData['ranked/' + location + 'rankScore'] = 
      }
      admin.database().ref('players/ksanghc/').update(summonerData);
    }
  });
  res.redirect(303, '');
});



/*
 * Pulls player's data using summoner name from RIOT API once added to the players database
 */
exports.checkPlayer = functions.database.ref('/players/{username}/exists').onWrite(event => {
  const summonerAPI = riotAPI + '/lol/summoner/v3/summoners/by-name/' + event.params.username + '?api_key=' + api_key;
  request(summonerAPI, function(err, res, body) {
    if (err) {
      res.redirect('/index');
    } else if (!err && res.statusCode == 200) {
      const parsedBody = JSON.parse(body);
      const summonerData = {};
      summonerData['level'] = parsedBody.summonerLevel;
      summonerData['summonerID'] = parsedBody.id;
      summonerData['accountID'] = parsedBody.accountId;
      return event.data.ref.parent.update(summonerData);
    }
  });
});

exports.getRank = functions.database.ref('/players/{username}/{summonerID}').onWrite(event => {
  const leagueAPI = riotAPI + '/lol/league/v3/positions/by-summoner/' + event.params.summonerID + '?api_key=' + api_key;
  request(leagueAPI, function(err, res, body) {
    if (err) {
      res.redirect('/');
    } else if (!err && res.statusCode == 200) {
      const bodyjson = JSON.parse(body);
      const summonerData = {};
      for (var league in bodyjson) {
        if (league.queueType == 'RANKED_FLEX_SR') {
          summonerData['ranked/solo/wins'] = league.wins;
          summonerData['ranked/solo/losses'] = league.losses;
          summonerData['ranked/solo/rank'] = league.tier + league.rank + league.leaguePoints;
        } else if (league.queueType == 'RANKED_SOLO_5x5') {
          summonerData['ranked/flex/wins'] = league.wins;
          summonerData['ranked/flex/losses'] = league.losses;
          summonerData['ranked/flex/rank'] = league.tier + league.rank + league.leaguePoints;
        }
      }
      return event.data.ref.parent.update(summonerData);
    }
  });
});


/* Take the text parameter passed to this HTTP endpoint and insert it into the
 * Realtime Database under the path /messages/:pushId/original
 
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  admin.database().ref('/messages').push({original: original}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.val();
      console.log('Uppercasing', event.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return event.data.ref.parent.child('uppercase').set(uppercase);
    });

*/
