import {
  DefaultMessageWelcome,
  CommandServiceAndProducts,
  CommandSchedule,
  CommandProduct,
} from './Menu/ImportHandle.js';


export async function CommandHandle(database, user, message) {
    let ResponseMessage = '';
    
    switch (message) {
        case '1':
        case 'agendamento':
        case 'agendamentos':
            ResponseMessage = await CommandSchedule(database, user);
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

    return ResponseMessage;
}