
// Video 20 02 - avatar do usuario

import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize, // objeto
      }
    );

    return this;
  } // init
}

export default File;
