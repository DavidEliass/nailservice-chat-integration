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
  const interactionMessageUser = request.body.Body.toLowerCase().trim();

  const user = await database.get('SELECT * FROM users WHERE phone = ?', [sender]);

  console.log('Mensagem recebida de:', sender);

  let WelcomemMessage = 'Olá! ✨ Bem-vindo(a) ao *Cantinho da Renata*! \n\nFico feliz em te receber por aqui. Para começar, por favor, escolha uma das opções abaixo: \n\n';
  WelcomemMessage += 'Escolha uma das opções abaixo digitando o número correspondente:\n';
  WelcomemMessage += '1. 📅AGENDAMENTOs \n';
  WelcomemMessage += '2. 🛒 SERVIÇOS/PRODUTOS\n';
  WelcomemMessage += '3. 📦Jequiti/Bijuteria';

 twiml.message(WelcomemMessage);

 if (interactionMessageUser === '1') {
    twiml.message('Para agendar, por favor, envie uma mensagem para este número, com a data e horário preferido. Em breve um de nossos atendentes entrará em contato.');
  } else if (interactionMessageUser === '2') {
    ttwiml.message('Temos uma variedade de serviços e produtos para cuidar de você!💅\n\n- Manicure/Pedicure\n- Alongamento de Cílios\n- Maquiagem profissional\n\nEntre em contato conosco para saber mais!');
  } else if (interactionMessageUser === '3') {
    twiml.message('As bijuterias e produtos da Jequiti estão disponíveis em nosso estabelecimento. Venha nos visitar ou peça o nosso catálogo online!');
  } else {
    // Se a mensagem não for uma das opções, ele envia a mensagem de boas-vindas novamente
    twiml.message(WelcomemMessage);
  }

  
  response
    .code(200)
    .header('Content-Type', 'text/xml')
    .send(twiml.toString());
 
});
  


export { serverClient }