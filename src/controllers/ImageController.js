const path = require("path");
const { createWriteStream } = require("fs");

const gm = require("gm").subClass({ imageMagick: true });

const axios = require("../config/axiosClient");
const isObjectEmpty = require("../utils/isObjectEmpty");
const isUrlValid = require("../utils/isUrlValid");

class ImageController {
  static async getImageThumbnail(req, res) {
    try {
      const body = req.body;

      if (isObjectEmpty(body)) {
        return res.status(400).send("Request body cannot be empty");
      }

      const urlKeyExist = Object.keys(body).includes("url");

      if (!urlKeyExist) {
        return res
          .status(400)
          .send("'url' property not present in request body");
      }

      if (!isUrlValid(body.url)) {
        return res.status(400).send("Invalid url");
      }

      const filename = path.resolve(__dirname, "../resources/images/image.png");

      const writeStream = createWriteStream(filename);

      const image = await this.#getImage(body.url);

      image.pipe(writeStream); //Download image to public folder

      // Once stream is done writing to file, read the file and pipe to response
      writeStream.on("close", () => {
        res.writeHead(200, {
          "Content-Type": "image/png",
        });

        gm(filename)
          .resize("50", "50")
          .stream((err, stdout) => {
            if (err) return res.status(500).send(err.message);

            stdout.pipe(res); //Transform file to thumbnail, then pipe to response
          });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async #getImage(url) {
    const response = await axios.get(url, { responseType: "stream" });

    return response.data;
  }
}

module.exports = ImageController;
