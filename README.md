# project3

README:
For the data collected, I used 4 tables from SF Bay Area Bikeshare from Kaggle and created two tables ‘users’ and ‘admins’ from Mackaroo. I joined them together on the db browser, created json files for each table then uploaded them into MongoDB Compass to complete my project.  
This Bike-Sharing System is designed to provide residents and tourists in the Bay Area with an accessible, affordable, and sustainable mode of transportation. It leverages real-time data to ensure availability and efficient management of bicycles across various stations.

System Requirements and Installations: 
- Node.js (v14.0 or later)
- Redis server (v6.0 or later)

Data Import Script
This project includes a script that automates the process of importing data from JSON files into Redis. It is called script.js in the folder. The script is designed to read JSON files containing data on users, stations, trips, and other entities relevant to the bike-sharing system and then populate the Redis database with this data using appropriate data structures. The script uses Node.js and the redis package to interact with the Redis server.

Steps for redis queries:
Install and connect to redis 
Run the import script, navigate to the directory containing the script and execute it using Node.js in your terminal. 
Connect to redis-cli by writing redis-cli into your terminal. 
Execute the commands from task 3 above.

Basic Node + Express application:
This Node.js application uses Express to manage a Redis database for a bike-sharing system. It allows you to check and update the number of available bikes at various stations.
Ensure you have Node.js and Redis installed on your machine. After cloning the project, install the required Node.js packages:
Make sure your Redis server is running on its default port.
Launch the application by running: node app.js
