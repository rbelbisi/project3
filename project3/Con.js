const redis = require('redis');
const fs = require('fs').promises;

// Create a Redis client
const client = redis.createClient({
  host: 'localhost',
  port: 6379
});

client.on('error', (err) => console.log('Redis Client Error', err));

async function loadData() {
  try {
    // Connect to Redis
    await client.connect();

    // Load and parse the Users JSON data
    const usersData = JSON.parse(await fs.readFile('Users.json', 'utf8'));
    // Insert each user into Redis
    for (const user of usersData) {
      for (const key in user) {
        if (user[key] !== null && user[key] !== undefined) {
          await client.hSet(`user:${user.id}`, key, user[key].toString());
        }
      }
    }

    // Load and parse the Admins JSON data
    const adminsData = JSON.parse(await fs.readFile('Admin.json', 'utf8'));
    // Insert each admin into Redis
    for (const admin of adminsData) {
      for (const key in admin) {
        if (admin[key] !== null && admin[key] !== undefined) {
          await client.hSet(`admin:${admin.id}`, key, admin[key].toString());
        }
      }
    }

    // Load and parse the Stations JSON data
    const stationsData = JSON.parse(await fs.readFile('Station.json', 'utf8'));
    // Insert each station into Redis
    for (const station of stationsData) {
      for (const key in station) {
        if (station[key] !== null && station[key] !== undefined) {
          await client.hSet(`station:${station.id}`, key, station[key].toString());
        }
      }
    }

    // Load and parse the Trips JSON data
    const tripsData = JSON.parse(await fs.readFile('Trips.json', 'utf8'));
    // Insert each trip into Redis
    for (const trip of tripsData) {
      if (trip.endTime !== null && trip.endTime !== undefined && trip.id !== null && trip.id !== undefined) {
        await client.zAdd(`trips:${trip.userId}`, { score: +trip.endTime, value: trip.id.toString() });
      }
    }

    // Load and parse the Status JSON data
    const statusData = JSON.parse(await fs.readFile('Status.json', 'utf8'));
    // Insert each status into Redis
    for (const status of statusData) {
      for (const key in status) {
        if (status[key] !== null && status[key] !== undefined) {
          await client.hSet(`status:${status.stationId}`, key, status[key].toString());
        }
      }
    }

    console.log('Data loaded into Redis');
  } catch (err) {
    console.error('Error loading data into Redis', err);
  } finally {
    // Disconnect after the operation
    await client.disconnect();
  }
}

loadData();
