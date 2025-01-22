import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import cors from 'cors'; // Import cors
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable if available

app.use(cors()); // Use cors middleware

// Serve static files from the root directory
app.use(express.static(__dirname));

app.get('/api/places', async (req, res) => {
    const { url } = req.query;
    console.log(`Fetching URL: ${url}`); // Log the URL being fetched
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(`Response data: ${JSON.stringify(data)}`); // Log the response data
        res.json(data);
    } catch (error) {
        console.error(`Error fetching data: ${error}`); // Log the error
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
