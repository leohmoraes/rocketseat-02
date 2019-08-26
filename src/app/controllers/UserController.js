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
  }//store

  async update(req,res){
    console.log("userId",req.userId);  //video 15
    return res.json({ ok : true });
  }


} //class

export default new UserController();
