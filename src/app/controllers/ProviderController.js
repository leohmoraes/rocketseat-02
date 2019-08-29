// video 21 03
import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    // const provider = await User.findAll(); //toda a lista

    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();
