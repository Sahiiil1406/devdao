const express = require('express');
const expressProxy = require('express-http-proxy');

const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Gateway server running');
});

// Logging middleware for /user route
app.use('/user', expressProxy('http://localhost:5173', {
    proxyReqPathResolver: (req) => req.url,
}));

// Direct proxy routes
app.use('/captain', expressProxy('http://localhost:3002'));
app.use('/ride', expressProxy('http://localhost:3003'));

app.listen(3000, () => {
    console.log('Gateway server listening on port 3000');
});
