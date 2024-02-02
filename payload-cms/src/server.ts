import express from 'express';
import payload from 'payload';
import cron from 'node-cron';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;

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
        fetch(`http://127.0.0.1:${port}/health`);
    });

    app.listen(port);
};

start();
