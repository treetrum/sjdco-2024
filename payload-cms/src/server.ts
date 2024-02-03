import express from 'express';
import payload from 'payload';
import dotenv from 'dotenv';
import cron from 'node-cron';

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
        console.log('Healthcheck hit!');
        res.send('ok');
    });

    // Cron job every 10 mins to keep the server alive
    cron.schedule('*/10 * * * *', () => {
        console.log('Hitting healthcheck from cronjob');
        fetch(`https://sjdco-2024-apac.onrender.com/health`);
    });

    app.listen(port);
};

start();
