import { log } from "console";
import multer from "multer";

const path = `${__dirname}/public/uploads`;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploader = multer({
  storage,
  onError: function (err, next) {
    console.log(err);
    next();
  },
});

export default { uploader };
