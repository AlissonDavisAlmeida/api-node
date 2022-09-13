import multer from "multer";
import path from "path";
import crypto from "crypto";

type MulterConfig = {
  directory: string;
  storage: multer.StorageEngine
};

const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString("hex");
      const fileName = `${hash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
} as MulterConfig;
