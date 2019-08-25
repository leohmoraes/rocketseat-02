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
        provider: Sequelize.BOOLEAN,
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
  }
}

export default User;
