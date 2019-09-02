import * as Yup from 'yup'; // NAo tem exports default no pacote
import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt'; // Video 29 11
import { Op } from 'sequelize'; // Operadores //Bonus Leo

import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification'; // Video 29 11

class AppointmentController {
  async index(req, res) {
    // 25 07 - listando agendamentos do usuario
    let { itens = 20 } = req.query;
    const { page = 1 } = req.query;

    if (itens > 20) itens = 20;

    const appointments = await Appointment
      .findAll({
        // todos os agendamentos
        where: {
          user_id: req.userId, // do usuario logado
          canceled_at: null, // que nao foram cancelados
        },
        attributes: ['id', 'date'], // trazendo somente o id e a data
        limit: itens,
        offset: (page - 1) * itens,
        order: ['date'], // ordenados pela data
        include: [
          {
            model: User,
            as: 'provider',
            attributes: ['id', 'name'], // traz o id e nome do prestador
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['id', 'path', 'url'], // o id e path é necessario para criar a url
              },
            ],
          },
        ],
      });
    //
    return res.json(appointments);
  }

  async store(req, res) {
    // video 23 05 -->
    // req.body é um objeto -> Yup.object
    const schema = Yup.object()
      .shape({
        provider_id: Yup.number().required(),
        date: Yup.date().required(),
      });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails' });
    }
    const { provider_id, date } = req.body;

    /**
     * Verifica se o prestador_id é um prestador
     * Check if provider_id is a provider
     */
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    /**
     * O prestador não pode agendar para ele mesmo
     */
    if (req.userId == provider_id) {
      return res
        .status(401)
        .json({ error: 'You can not to add to yourself' });
    }

    /**
     * Verifica se o agendamento está repetido //Bonus Leo
     */
    const checkDuplicate = await Appointment.findOne({
      where: {
        provider_id, //prestador
        date,
        user_id: req.userId,
        // canceled_at: {
        //   [Op.ne]: null
        // }
      },
    });

    if (checkDuplicate) {
      return res
        .status(401)
        .json({ error: 'This appointment has been added' });
    }


    /**
     * Check for past dates
     * a data agendada está no passado
     *
     * */

    const hourStart = startOfHour(parseISO(date)); // pega somente o inicio da hora a partir da data informada

    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'Past dates are not permitted' });
    }

    // console.log(hourStart);
    /**
     * Check data availability
     */
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointment
      .create({
        user_id: req.userId,
        date,
        provider_id,
      });

    /**
     *  Notify appointment provider / Alerta de um novo agendamento //Video 29 11
     */
    const user = await User.findByPk(req.userId);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    await Notification
      .create({
        content: `Novo agendamento de ${user.name} para o ${formattedDate}`,
        user: provider_id,
        // read > default is false
      });

    return res.json(appointment);
  } // store
  // update
}

export default new AppointmentController();
