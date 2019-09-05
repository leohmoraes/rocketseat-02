// Video 33 15 configurando nodemailer

import nodemailer from 'nodemailer';
import { resolve } from 'path'; // Video 34 16 configurando templates de email
import exphbs from 'express-handlebars'; // Video 34 16 configurando templates de email
import nodemailerhbs from 'nodemailer-express-handlebars'; // Video 34 16 configurando templates de email
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates(); // Video 34 16 configurando templates de email
  } // construct

  configureTemplates() {
    // Video 34 16 configurando templates de email
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails'); // ../app/views/emails

    this.transporter.use(
      // para usar uma configuracao a mais
      'compile', // como formata nossa mensagem
      nodemailerhbs({
        // configuracoes
        viewEngine: exphbs.create({
          // integracao do express-handlebars
          layoutsDir: resolve(viewPath, 'layouts'), // viewPath chega na pasta de emails adiciona a pasta layouts
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default', // criar o default.hbs
          extname: '.hbs', // qual a extensao usada como template,
        }),
        viewPath,
        extName: '.hbs', // verifica que este nome é extName
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
