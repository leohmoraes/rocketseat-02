// Video09 - model de usuario
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs'; // video 12

class User extends Model {
  static init(sequelize) {
    // Metodo init da Class Model
    // somente os campos utilizados para cadastrar o usuario,
    // ignorando o timestamp e outras
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // video 12
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN, // v 21 03
      },
      {
        sequelize, // objeto
      }
    );

    this.addHook('beforeSave', async user => {
      // video 12
      if (user.password) {
        const forca_criptografia = 8;
        user.password_hash = await bcrypt.hash(
          user.password,
          forca_criptografia
        );
      }
    }); // video 12

    return this; // faltou do video 12
  } // init

  // relacionamento User X File
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' }); // video [12,21-03]
  }

  checkPassword(password) {
    // video 14
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
