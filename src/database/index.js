// video 10 - criando a conexao com o BD e loader de models

import Sequelize from 'sequelize';
import mongoose from 'mongoose'; // video 28 10 configurando o mongodb
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment'; // Video 22 04 - migration e model de agendamento

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo(); // video 28 10 configurando o mongodb
  }

  // conexao com BD e carregar modulos
  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    // video 28 10 configurando o mongodb
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      {
        useNewUrlParser: true, // formato novo de conexao
        useFindAndModify: true, // configuracao de como usar e modificar os dados
      }
    );
  }
}

export default new Database();
