import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    /**
     * Verifica se o usuario logado é um prestador
     * Check if provider_id is a provider
     */
    const checkIsProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Ony providers can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' }) // method chaining
      .limit(20);
    return res.json(notifications);
  } // index

  async update(req, res) {
    // video 31 13 marcar notificacoes como lidas
    // const notification = await Notification.findById(req.params.id); //depois teria que atualizar com o parametro do ID

    const notification = await Notification.findByIdAndUpdate(
      req.params.id, // paramentro
      { read: true }, // campos a serem alterados
      { new: true } // true para retornar o registro atualizado
    );

    return res.json(notification);
  }
}

export default new NotificationController();
