import express from 'express';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';
import https from 'https';
import querystring from 'querystring';
import cors from 'cors';

// Get the directory name of the current module
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
const apiKey = process.env.API_KEY;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, '../../dist')));

// API route to handle proxying requests
app.post('/api', (req, res) => {
    const { endpoint, url } = req.body;

    if (!endpoint || !url) {
        return res.status(400).send('Endpoint and URL are required');
    }

    const apiUrl = 'api.meaningcloud.com'; // API base URL
    console.log(`Forwarding request to: ${apiUrl}${endpoint}`);

    const postData = querystring.stringify({
        key: apiKey,
        url: url,
        lang: 'auto'
    });

    const options = {
        hostname: apiUrl,
        port: 443,
        path: endpoint,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    const request = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            if (response.statusCode === 200) {
                res.setHeader('Content-Type', 'application/json');
                res.send(data);
            } else {
                console.error(`API error: ${data}`);
                res.status(response.statusCode).send(data);
            }
        });
    });

    request.on('error', (error) => {
        console.error('Request error:', error);
        res.status(500).send('Internal Server Error');
    });

    request.write(postData);
    request.end();
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
