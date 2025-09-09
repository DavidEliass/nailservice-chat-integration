import twilio from 'twilio';
import dotenv from 'dotenv';
import fastify from "fastify";
import fastifyFormbody from '@fastify/formbody';
import { getDatabaseConnection } from './database/config.js';

const MessagingResponse = twilio.twiml.MessagingResponse;

dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  throw new Error('Twilio credentials are not set in environment variables.');
}

const client = twilio(accountSid, authToken);
console.log('Twilio client initialized successfully.');

const serverClient = fastify();

serverClient.register(fastifyFormbody);

serverClient.post('/message', async (request, response) => {
  const twiml = new MessagingResponse();
  const sender = request.body.From;
  const database = await getDatabaseConnection();

  // const user = await database.get('SELECT * FROM users WHERE phone = ?', [sender]);

  console.log('Mensagem recebida de:', sender);

  // if (!user) {
    // // Se o usuário não existe, insere no banco de dados
    // await database.run('INSERT INTO usuarios (phone, FirstInteraction) VALUES (?, ?)', [sender, Date.now()]);

  let WelcomemMessage = 'Olá! ✨ Bem-vindo(a) ao *Cantinho da Renata*! \n\nFico feliz em te receber por aqui. Para começar, por favor, escolha uma das opções abaixo: \n\n';
  WelcomemMessage += 'Escolha uma das opções abaixo digitando o número correspondente:\n';
  WelcomemMessage += '1. 📅AGENDAMENTOs \n';
  WelcomemMessage += '2. 🛒 SERVIÇOS/PRODUTOS\n';
  WelcomemMessage += '3. 📦Jequiti/Bijuteria';

  twiml.message(WelcomemMessage);

  
  response
    .code(200)
    .header('Content-Type', 'text/xml')
    .send(twiml.toString());
});
  


export { serverClient }