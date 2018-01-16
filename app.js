'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var Config = require('./config');
var FB = require('./facebook');
var Bot = require('./bot');


// LETS MAKE A SERVER!
var app = express();
app.set('port', (process.env.PORT) || 5000);
// SPIN UP SERVER
app.listen(app.get('port'), function () {
    console.log('Running on port', app.get('port'));
});
// PARSE THE BODY
app.use(bodyParser.json());


// index page
app.get('/', function (req, res) {
    res.send('hello world i am a chat bot');
});
console.log("hsdiahdisahdaihds");
// for facebook to verify
app.get('/webhook', function (req, res) {
    /*if (req.query['hub.verify_token'] === Config.FB_VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong token');*/
    const VERIFY_TOKEN = Config.FB_VERIFY_TOKEN;
    console.log(VERIFY_TOKEN);
});

// to send messages to facebook
app.post('/webhook', function (req, res) {
    /* let entry = FB.getFirstMessagingEntry(req.body);
     // IS THE ENTRY A VALID MESSAGE?
     if (entry && entry.message) {
         if (entry.message.attachments) {
             // NOT SMART ENOUGH FOR ATTACHMENTS YET
             FB.fbMessage(entry.sender.id, "That's interesting!");
         } else {
             // SEND TO BOT FOR PROCESSING
             Bot.client.message(entry.message.text).then((data) => {
                 FB.fbMessage(entry.sender.id,Bot.Answer(data));

             });
         }
     }

     res.sendStatus(200)*/
    // Parse the request body from the POST
    let body = req.body;
    console.log(body);
    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Get the webhook event. entry.messaging is an array, but
            // will only ever contain one event, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

        });

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }


});

