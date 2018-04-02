'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var Config = require('./config');
var FB = require('./facebook');
var Bot = require('./bot');
var sign = require('./bot_signup');


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

// for facebook to verify
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === Config.FB_VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong token');

    /*let VERIFY_TOKEN = Config.FB_VERIFY_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            console.log(403);
            res.sendStatus(403);
        }
    }*/
});

// to send messages to facebook

app.post('/webhook', function (req, res) {
    let entry = FB.getFirstMessagingEntry(req.body);
    // IS THE ENTRY A VALID MESSAGE?
    if (entry && entry.message) {
        if (entry.message.attachments) {
            // NOT SMART ENOUGH FOR ATTACHMENTS YET
            FB.fbMessage(entry.sender.id, "That's interesting!");
        }
        else {

            let sender = entry.sender.id;
            // Parse the request body from the POST
            /*let body = req.body;
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

                    // pass the event to the appropriate handler function
                    if (webhook_event.message) {
                        handleMessage(sender_psid, webhook_event.message);
                    }

                });

                // Return a '200 OK' response to all events
                res.status(200).send('EVENT_RECEIVED');

            } else {
                // Return a '404 Not Found' if event is not from a page subscription
                console.log("404");
                res.sendStatus(404);
            }
        */

            // SEND TO BOT FOR PROCESSING

            //FB.fbMessage(entry.sender.id, sender + " " + '@' + entry.message.text.toLowerCase() + '@');
            let senderId = sign.qeueLook(entry.sender.id);
            if (senderId > -1) {
                let signingup = sign.signQeue[senderId].signProc(sender, entry.message.text.toLowerCase());
                if (signingup === true)
                    sign.qeueDel(sender);
            }

            else {
                Bot.client.message(entry.message.text.toLowerCase()).then((data) => {
                    let msg = Bot.Answer(data, function () {
                        FB.fbMessage(sender, msg);
                        if (msg === 'Signing-up') {
                            FB.fbMessage(sender, "To Exit Signing-up Form at anytime please tell me (end000)");
                            FB.fbMessage(sender, "What is your First Name ?");
                            sign.qeueAdd(sender);
                        }
                    });
                });
            }
        }
        res.sendStatus(200);
    }
});


/*function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": {"access_token": Config.FB_PAGE_TOKEN},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!');
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}*/

/*function handleMessage(sender_psid, received_message) {

    let response;

    // Check if the message contains text
    if (received_message.text) {

        // Create the payload for a basic text message
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
        }
    }

    // Sends the response message
    callSendAPI(sender_psid, response);
}*/