const { io } = require('socket.io-client');
const socket = io('http://localhost:3000');

const tripId = "8c7433f1-ecfe-422c-a8ea-be924069270d"; // Replace with actual Trip ID

socket.on('connect', () => {
  console.log('✅ Driver connected');

  setInterval(() => {
    const payload = {
      tripId,
      latitude: 28.644800 + Math.random() * 0.01,
      longitude: 77.216721 + Math.random() * 0.01,
      timestamp: new Date(),
      handicapSeatsAvailable: Math.floor(Math.random() * 3),
    };

    socket.emit('location:update', payload);
  }, 3000);
});
