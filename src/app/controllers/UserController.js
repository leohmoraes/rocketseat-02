import User from '../models/User'

class UserController {
  async store(req,res,next){
    const User = await User.create(req.body) //video 11


    return res.json()
  }
}

export default new UserController();
