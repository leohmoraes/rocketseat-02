// video 15
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // next continua
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // const { bearer, token } = authHeader.split(' ');
  const [, token] = authHeader.split(' '); // pegando o segundo array
  /**
   * O authorization vem no formato bearer token, no split, passamos um espaço em branco,
   * então ele vai retornar um array com duas partes ['bearer', 'token'], com a desestruturação
   * estamos pegando apenas o token, já que na primeira posição do array, passamos apenas a virgula.
   * Então a constante token,
   * vai ter apenas o valor do token, a parte da string bearer ficaria na primeira posição do array.
   */

  try {
    // jwt.verify(token, (err, result) =>  {
    // metodo antigo
    // })
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
