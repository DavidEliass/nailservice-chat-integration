export async function ScheduleState(database, user, message) {
    const requestedTime = message;

    let ResponseMessage = '';

    if (requestedTime) {
        
        ResponseMessage = `Obrigado! Recebemos sua solicitação de agendamento para *${requestedTime}*. Em breve um de nossos atendentes entrará em contato para confirmar e tirar suas dúvidas.`;
        
        // Retorna o estado do usuário para 'initial'
        await database.query('UPDATE users SET state = ? WHERE phone = ?', ['initial', user.phone]);
    } else {
        // Se a mensagem for vazia ou não tiver o que você precisa
        ResponseMessage = 'Não entendi o horário. Por favor, envie o dia e o horário que deseja agendar. Ex: "quinta-feira as 10h".';
    }

    return ResponseMessage;
}