import Notification from '../schemas/Notification'
import User from "../models/User";

class NotificationController {
  async index(req, res) {

    /**
     * Verifica se o usuario logado é um prestador
     * Check if provider_id is a provider
     */
    const checkIsProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true
      },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Ony providers can load notifications' })
      ;
    }

    console.log("Notication.Index","Prestador",req.userId);

    const notifications = await Notification
      .find({
        user: req.userId,
      })
      .sort({createdAt: 'desc'})  //method chaining
      .limit(20)
    ;

    return res.json(notifications);
  }
}

export default new NotificationController();
