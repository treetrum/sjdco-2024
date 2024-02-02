import express from 'express';
import payload from 'payload';
import cron from 'node-cron';

require('dotenv').config();
const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
    res.redirect('/admin');
});

const start = async () => {
    // Initialize Payload
    await payload.init({
        secret: process.env.PAYLOAD_SECRET,
        express: app,
        onInit: async () => {
            payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
        },
    });

    // Healthcheck
    app.get('/health', (_, res) => {
        res.send('ok');
    });

    // Cron job every 10 mins to keep the server alive
    cron.schedule('*/10 * * * *', () => {
        console.log('Hitting healthcheck from cronjob');
        fetch('/health');
    });

    app.listen(3000);
};

start();
