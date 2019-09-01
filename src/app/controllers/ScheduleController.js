// Video 27 09 aplicando paginacao (2)
// import * as Yup from 'yup'; // NAo tem exports default no pacote
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize'; // Operadores

import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const { date } = req.query;
    const parseDate = parseISO(date);

    const appointments = await Appointment.findAll({
      // todos os agendamentos do dia do prestador logado
      where: {
        provider_id: req.userId, // do usuario logado
        canceled_at: null, // que nao foram cancelados
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
      },
      attributes: ['id', 'date', 'user_id'], // trazendo somente o id e a data
      order: ['date'], // ordenados pela data
      include: [
        {
          model: User,
          as: 'user',
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
}

export default new ScheduleController();
