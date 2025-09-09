import twilio from 'twilio';
import dotenv from 'dotenv';
import fastify from "fastify";
import fastifyFormbody from '@fastify/formbody';
import { getDatabaseConnection } from './database/config.js';
dotenv.config();


// Default Message
import { DefaultMessageWelcome } from './commands/defaultInteraction.js';
// Commands 
import { CommandServiceAndProducts } from './commands/serviceAndProduct.js';
import { CommandSchedule } from './commands/schedule.js';
import { CommandProduct } from './commands/products.js';

const MessagingResponse = twilio.twiml.MessagingResponse;

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
  // const database = await getDatabaseConnection();
  const interactionMessageUser = request.body.Body.toLowerCase().trim();

  // const user = await database.get('SELECT * FROM users WHERE phone = ?', [sender]);

  console.log('Mensagem recebida de:', sender);

   let ResponseMessage = '';

  // Lógica de "Command Handler"
  switch (interactionMessageUser) {
    case '1':
    case 'agendamento':
    case 'agendamentos':
      ResponseMessage = CommandSchedule();
      break;
    case '2':
    case 'serviços':
    case 'servicos':
      ResponseMessage = CommandServiceAndProducts();
      break;
    case '3':
    case 'jequiti':
    case 'bijuteria':
      ResponseMessage = CommandProduct();
      break;
    default:
      ResponseMessage = DefaultMessageWelcome();
      break;
  }

  twiml.message(ResponseMessage);



  response
    .code(200)
    .header('Content-Type', 'text/xml')
    .send(twiml.toString());
 
});
  


export { serverClient }