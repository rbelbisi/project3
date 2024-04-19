const express = require('express');
const redis = require('redis');
const app = express();
const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

app.use(express.json()); // Middleware to parse JSON bodies

// Get the number of available bikes at a station
app.get('/stations/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const availableBikes = await client.hGet(`stationAvailability:${id}`, 'availableBikes');
        res.json({ stationId: id, availableBikes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update the number of available bikes
app.put('/stations/:id', async (req, res) => {
    const { id } = req.params;
    const { availableBikes } = req.body;
    try {
        await client.hSet(`stationAvailability:${id}`, 'availableBikes', availableBikes);
        res.json({ message: 'Updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a station
app.delete('/stations/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.del(`stationAvailability:${id}`);
        res.json({ message: 'Station deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Set the server to listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

