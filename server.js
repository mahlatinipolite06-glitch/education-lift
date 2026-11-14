const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Local in-memory databases (also persists to json files if available)
const registerHandler = require('./api/register.js');
const donateHandler = require('./api/donate.js');
const studentsHandler = require('./api/students.js');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
    // Helper to wrap Vercel-style handlers
    const executeHandler = (handler) => {
        let bodyStr = '';
        req.on('data', chunk => { bodyStr += chunk; });
        req.on('end', () => {
            try {
                req.body = bodyStr ? JSON.parse(bodyStr) : {};
            } catch (e) {
                req.body = {};
            }

            res.status = (code) => {
                res.statusCode = code;
                return res;
            };

            res.json = (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
            };

            handler(req, res);
        });
    };

    // Route API requests
    if (req.url === '/api/register' || req.url === '/api/register/') {
        return executeHandler(registerHandler);
    }
    if (req.url === '/api/donate' || req.url === '/api/donate/') {
        return executeHandler(donateHandler);
    }
    if (req.url === '/api/students' || req.url === '/api/students/') {
        return executeHandler(studentsHandler);
    }

    // Serve static files
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath.split('?')[0]);

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`EduLift Backend Server running at http://localhost:${PORT}`);
});

