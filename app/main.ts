import twilio from 'twilio';
import dotenv from 'dotenv';
import fastify from "fastify";
import fastifyFormbody from '@fastify/formbody';


const MessagingResponse = twilio.twiml.MessagingResponse;


dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID; //TODO: ARRAY
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  throw new Error('Twilio credentials are not set in environment variables.');
}

const client = twilio(accountSid, authToken);
console.log('Twilio client initialized successfully.');

const serverClient = fastify();

serverClient.register(fastifyFormbody);


async function bootrap() {
    serverClient.post('/message', (request, response) => {
        const twiml = new MessagingResponse();

        twiml.message('Mensagem recebida com sucesso! Em breve, um de nossos atendentes entrará em contato.');

         response
        .code(200)
        .header('Content-Type', 'text/xml')
        .send(twiml.toString());

    });
}


bootrap();


export { serverClient};