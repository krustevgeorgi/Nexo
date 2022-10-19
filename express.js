const path = require('path');
const compression = require('compression');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, 'build');
const port = process.env.PORT || 3000;

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

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up!');
});
