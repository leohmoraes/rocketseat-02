// video 10 - criando a conexao com o BD e loader de models

import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  // conexao com BD e carregar modulos
  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
