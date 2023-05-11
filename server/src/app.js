require('dotenv').config();

const ws = require('ws');
const express = require('express');
const configApp = require('../config/configApp');

const app = express();
configApp(app);

const { PORT } = process.env;
const CURRENT_PORT = PORT ?? 4000;

const httpServer = app.listen(CURRENT_PORT ?? 5000, () => {
  console.log(`Server started ${CURRENT_PORT}`);
});

const wsServer = new ws.WebSocketServer({ server: httpServer });
wsServer.on('connection', (currentClient) => {
  currentClient.on('message', (data) => {
    const utfMessage = data.toString('utf-8');
    const jsonMess = JSON.parse(utfMessage);
    wsServer.clients.forEach((oneClient) => {
      oneClient.send(JSON.stringify(jsonMess));
    });
  });
});
