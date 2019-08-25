// Video09 - model de usuario

import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    // Metodo init da Class Model
    // somente os campos utilizados para cadastrar o usuario,
    // ignorando o timestamp e outras
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize, // objeto
      }
    );
  }
}

export default User;
