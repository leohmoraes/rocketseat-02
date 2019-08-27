// Video 20 02 - avatar do usuario

import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: { //video 21 03
          type: Sequelize.VIRTUAL, // nao existe na tabela
          get() {
            // acesso ao this da propriedade do objeto
            // return "qualquer coisa";
            return `http://localhost:3333/files/${this.path}`;
          },
        },
      },
      {
        sequelize, // objeto
      }
    );

    return this;
  } // init
}

export default File;
