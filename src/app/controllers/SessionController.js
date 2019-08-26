import jwt from 'jsonwebtoken';

import User from '../models/User';

class SessionController {
  async store(req, res) {
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
      token: jwt.sign({ id }, '9dffij39asf23nsfnsvsdsa', {
        // md5('stringSecreta')
        expiresIn: '7d',
      }),
    }); // return
  } // store
} // class

export default new SessionController();
