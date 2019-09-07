// video 37 19 listando horarios disponiveis

import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import Op from 'sequelize';
import Appointment from '../models/Appointment';

// Unix Timestamp
class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const searchDate = Number(date); // parseInt funciona tb! +10800 3600 7200 10800

    const { providerId } = req.params;

    const appointments = await Appointment.findAll({
      where: {
        provider_id: providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
      attributes: ['id', 'date'],
    });

    const schedule = [
      '08:00', // 2019-06-23 08:00:00
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
    ];

    const avaiable = schedule.map(time => {
      const [hour, minute] = time.split(':');

      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute), // la lista acima
        0
      );

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, new Date()) &&
          !appointments.find(a => format(a.date, 'HH:mm') === time),
      };
    }); // map

    return res.json(avaiable);
    // return res.json(appointments);
  }
}

export default new AvailableController();
