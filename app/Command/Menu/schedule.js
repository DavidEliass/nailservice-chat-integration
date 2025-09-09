export async function CommandSchedule(database, user) {
    const [rows] = await database.query('SELECT day, time_slot FROM AvailableDate WHERE is_available = TRUE');
    
    let horarios = '\n*Horários Disponíveis:*\n\n';
    rows.forEach(row => {
        horarios += `• ${row.day} - ${row.time_slot}\n`;
    });
    
    const message = `Você escolheu AGENDAMENTOS.\n\n${horarios}\n\nPor favor, envie o dia e horário que deseja agendar.`;

    // Mude o estado do usuário para "agendamento_data" no banco de dados.
    await database.query('UPDATE users SET state = ? WHERE phone = ?', ['agendamento_data', user.phone]);

    return message;
}