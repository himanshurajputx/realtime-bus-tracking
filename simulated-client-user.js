const { io: clientIo } = require('socket.io-client');
const client = clientIo('http://localhost:3000');

const tripId = "8c7433f1-ecfe-422c-a8ea-be924069270d"; // Same tripId user is watching

client.on('connect', () => {
  console.log('👤 User connected');
  client.emit('trip:subscribe', tripId);
});

client.on('location:broadcast', (data) => {
  console.log('📡 New Location:', data);
});
