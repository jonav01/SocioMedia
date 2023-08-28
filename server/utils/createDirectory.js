import fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const fsPromises = fs.promises;
export const createDirectory = async (req, res, next) => {
  const assetsDirectory = "/public/assets";
  const __filename = fileURLToPath(import.meta.url); // ensures cross-platform absolute path
  const __dirname = path.dirname(__filename);
  const directoryExists = fs.existsSync(assetsDirectory);
  try {
    if (!directoryExists) {
      await fsPromises.mkdir(path.join(__dirname, "..", assetsDirectory), {
        recursive: true, // recursively call mkdir to create the directory if it doesnt exist
      });

      next();
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
