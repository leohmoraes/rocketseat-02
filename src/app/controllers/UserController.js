import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email, provider } = await User.create(req.body); // video 11

    return res.json({
      // somente os dados que retornam para o React ou Cliente
      id,
      name,
      email,
      provider,
    });
  } // store

  async update(req, res) {
    // console.log('---------userId', req.userId); // video 15
    // video 16 --->
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      // deseja alterar a senha quando tem oldPassword
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      // somente os dados que retornam para o React ou Cliente
      id,
      name,
      email,
      provider,
    }); // <--- video 16
  }
} // class

export default new UserController();
