const functions = require('firebase-functions');
const axios = require('axios');
const { IncomingWebhook } = require('@slack/client');

const notify = (response) => {
    // Send alert to the webhook channel
    const url = functions.config().slack.url;
    const webhook = new IncomingWebhook(url);
    webhook.send('<@U03UGAUP6> https://satsukita-andon.com is down!', (err) => {
        if (err) {
            console.log('Error: ', err);
            response.status(500).send('failed to send slack notification');
            return;
        }
        response.status(404).send('https://satsukita-andon.com is down!');
        return;
    });
};

exports.externalMonitor = functions.https.onRequest((request, response) => {
    axios.get('https://satsukita-andon.com').then((res) => {
        if (res.status === 200) {
            response.status(200).end();
            return;
        } else {
            notify(response);
        }
    }).catch((err) => {
        console.log('Error: ', err);
        notify(response);
    });
});
