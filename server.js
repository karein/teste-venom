import express from 'express';

import { InitVenomClient } from './index.js';

const app = express();

app.use(express.json())

const port = 5000;

const sessionName = 'test-session';
const initVenomClient = new InitVenomClient(sessionName);
await initVenomClient.init();


app.get('/', (_, res) => {
  res.send('Hello World!')
})

app.get('/send-text', async (req, res) => {
  const { to, text } = req.query
  const response = await initVenomClient.sendText(to, text);
  res.send(response)
})

app.post('/send-buttons', async (req, res) => {
  const { to, buttons } = req.body
  const response = await initVenomClient.sendButtons(to, buttons)
  res.send(response)
})

app.get('/send-image', async (req, res) => {
  const { to, imageRoute, imageName, captionText } = req.query;
  const response = await initVenomClient.sendImage(to, imageRoute, imageName, captionText)
  res.send(response)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`)
})