import * as Yup from 'yup'; // Video 17 Nao tem exports default no pacote

// video 14

import jwt from 'jsonwebtoken';

import User from '../models/User';

import authConfig from '../../config/auth';

/**
 * O await espera o resultado da promise (por exemplo das queries),
 * o async torna o metodo assincrono tambem e é necessário pra utilizar o await dentro da função
 */
class SessionController {
  async store(req, res) {
    /**
     * A validacao pode ser feita na sessao
     */
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(), //
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body; // pega apenas o usuario e senha do form

    const user = await User.findOne({ where: { email } }); // quando sao campo tabela e request forem iguais pode ser assim

    if (!user) {
      return res.json(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        // md5('stringSecreta')
        expiresIn: authConfig.expiresIn,
      }),
    }); // return
  } // store
} // class

export default new SessionController();
