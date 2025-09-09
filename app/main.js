import twilio from 'twilio';
import dotenv from 'dotenv';
import fastify from "fastify";
import fastifyFormbody from '@fastify/formbody';
import { getDatabaseConnection } from './database/mysql-connect.js';
import { ScheduleState } from './Command/States/ScheduleState.js';
dotenv.config();


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
  const interactionMessageUser = request.body.Body.toLowerCase().trim();
  
  const database = await getDatabaseConnection();
  let [users] = await database.query('SELECT * FROM users WHERE phone = ?', [sender]);
  let user = users[0];

   if (!user) {
            await database.query('INSERT INTO users (phone, state) VALUES (?, ?)', [sender, 'initial']);
            user = { phone: sender, state: 'initial' }; 
            console.log('Mensagem recebida de:', sender);
    }

      await database.query('UPDATE users SET date = NOW() WHERE phone = ?', [sender]);


      
   let ResponseMessage = '';


   if (user.state === 'initial') {
            ResponseMessage = await CommandHandle(database, user, interactionMessageUser);
        } else if (user.state === 'agendamento_data') {
            ResponseMessage = await ScheduleState(database, user, interactionMessageUser);
    }


  twiml.message(ResponseMessage);



  response
    .code(200)
    .header('Content-Type', 'text/xml')
    .send(twiml.toString());
 
});
  


export { serverClient }