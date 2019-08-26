 //video 15
 import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';
import { decode } from 'punycode';

export default async (req,res,next) => { //next continua
  const authHeader = req.headers.authorization;

  console.log(authHeader);

  if(!authHeader) {
    return res.status(401).json({ error: "Token not provided"});
  }

  // const { bearer, token } = authHeader.split(' ');
  const [, token ] = authHeader.split(' '); //pegando o segundo array

  try {
    // jwt.verify(token, (err, result) =>  {
      //metodo antigo
    // })
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    console.log("decoded",decoded);

    req.userId = decoded.id;

    return next();

  }catch (err) {
    return res.status(401).json({ error: "Token invalid"});

  }

  return next();
};
