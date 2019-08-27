import * as Yup from 'yup'; // NAo tem exports default no pacote

import User from '../models/User';

class UserController {
  async store(req, res) {
    // Video 17 -->
    // req.body é um objeto -> Yup.object
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const userExists = await User.findOne({ where: { email: req.body.email } });
    // Video 17 <--

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
    /**
     * Nome e Email nao sao obrigatorios...
     */
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string() // quando o pass estiver preenchido o confirm é obrigatorio e igual ao pass
        .min(6)
        .when('oldPassword', (
          oldPassword,
          field // validacao condicional
        ) => (oldPassword ? field.required() : field)),
      confirmPassword: Yup.string().when(
        'password',
        (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field // ref=> referencua
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
