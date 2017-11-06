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

/*
exports.testPlayer = functions.https.onRequest((req, res) => {
  const username = req.query.text;
  const summonerAPI = riotAPI + '/lol/summoner/v3/summoners/by-name/' + req.query.text + '?api_key=' + api_key;
  request(summonerAPI, function(err, res, body) {
    if (err) {
      res.redirect(400, '/index');
    } else if (!err && res.statusCode == 200) {
      const parsedBody = JSON.parse(body);
      const summonerData = {};
      summonerData['level'] = parsedBody.summonerLevel;
      summonerData['summonerID'] = parsedBody.id;
      summonerData['accountID'] = parsedBody.accountId;
      admin.database().ref('players/' + req.query.text).update(summonerData);
      res.redirect(200, '/index');
    }
  });
  /*
  admin.database().ref('/players/' + username).push({key: api_key}).then(snapshot => {
    res.redirect(303, snapshot.ref);
  });
  
  res.redirect(303, '/index');
});

*/

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
    } else {
      res.direct('/index');
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
