// Video 22 04 - migration e model de agendamento

import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns'; // Video 38 20 campos virtuais no agendamento

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: { // Video 38 20 campos virtuais no agendamento
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: { // Video 38 20 campos virtuais no agendamento
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      {
        sequelize, // objeto
      }
    );

    return this;
  } // init

  // relacionamento User X Appointment(Agendamento)
  /**
   * Quando a tabela se relaciona 2x com outra, e obrigatorio nomear este relacionamento "AS"
   * @param  models
   */
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
