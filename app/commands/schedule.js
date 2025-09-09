export function CommandSchedule() {
    const AvailableSchedule = `
    *Horários Disponíveis para Agendamento:*
    
    _SEGUNDA-FEIRA:_
    14:00 - 15:00
    15:00 - 16:00
    
    _TERÇA-FEIRA:_
    10:00 - 11:00
    11:00 - 12:00
    16:00 - 17:00
    
    _QUARTA-FEIRA:_
    (Dia indisponível)

    _QUINTA-FEIRA:_
    09:00 - 10:00
    
    _SEXTA-FEIRA:_
    13:00 - 14:00
    `;
    return 'Você escolheu AGENDAMENTOS.\n\n' + AvailableSchedule + '\n\nPor favor, envie o dia e horário desejado, ou envie "menu" para voltar.';
}