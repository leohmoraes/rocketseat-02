// v20 = 02 video 02
import File from '../models/File';

class FileController {
  async store(req, res) {
    // req.file (unico arquivo),: encoding, originalname, filename, size....
    // req.files (varios)
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
