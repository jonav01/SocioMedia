import fs from "fs";

const fsPromises = fs.promises;
export const createDirectory = (req, res, next) => {
  const assetsDirectory = "assets";
  const directoryExists = fs.existsSync(`/public/${assetsDirectory}`);
  try {
    if (!directoryExists) {
    }
  } catch (error) {
    res.send(404).json({ msg: error.message });
  }
};
