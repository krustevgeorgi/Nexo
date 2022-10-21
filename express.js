import express from 'express';
import path from 'path';
import compression from 'compression';
import {getPrice} from './src/RouterService.js';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, 'build');
// const port = process.env.PORT || 3000;
const port = 4000;

// Add gzip compression for all responses
app.use(compression());

// Add middleware for http to https redirect
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
        res.redirect(`https://${req.hostname}${req.originalUrl}`);
        return;
    }

    next();
});

// app.use(express.static(publicPath));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicPath, 'index.html'));
// });

app.get('/getPrice', async (req, res) => {
    getPrice()
})

app.listen(port, () => {
    console.log('Server is up!');
});
