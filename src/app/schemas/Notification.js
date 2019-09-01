// Video 29 11 notificando novos agendamentos
import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      // mensagem
      type: String,
      required: true,
    },
    user: {
      // dados do usuario
      type: Number,
      required: true,
    },
    read: {
      // registra se a notificacao foi lida
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // created_at, updated_at
  }
);

export default mongoose.model('Notification', NotificationSchema);
