// modulo 03 - video 01 - CONFIGURANDO O MULTER yarn add multer //19 01
import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        return cb(null, res.toString('hex') + extname(file.originalname)); // primeiro argumento do callback é null, res (resposta do randombytes)
        // (file.originalname) para extname(file.originalname) porque em nivel mundial terá caracteres estranhos
      });
    },
  }),
};
