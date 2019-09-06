// Video 35 17 configurando a fila com redis

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt'; // Video 35 17

import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  /**
   * A tarefa que vai ser executada quando este processo for executado,
   * o handle recebe mais informacoes, portanto  será selecionado apenas o Appointment
   */
  async handle({ data }) {
    const { appointment } = data; // appointment, exemplo

    // console.log('A fila executou');

    await Mail.sendMail({
      // Origem: Video 33 15 configurando nodemailer
      // movido na 35 17 configurando a fila com redis
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: `Agendamento foi cancelado`,
      // text: 'Voce tem um novo cancelamento',
      template: 'cancellation', // Video 34 16 configurando templates de email
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às 'H:mm'h'",
          {
            locale: pt,
          }
        ),
      }, // Video 34 16 configurando templates de email
    });
  }
}

export default new CancellationMail();

/**
 * Se importar CancellationMail from
 * Ao usar o get(key) pode-se usar abaixo
 * CancellationMail.key(...)
 */
