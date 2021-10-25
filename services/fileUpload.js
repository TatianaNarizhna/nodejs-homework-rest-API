const Jimp = require('jimp');
const fs = require('fs/promises');
const path = require('path');

class UploadAvatar {
    constructor(destination) {
        this.destination = destination;
    }

    async #transformAvatar(pathFile) {
        const img = Jimp.read(pathFile)
        await (await img).autocrop().cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
        .writeAsync(pathFile)
    }

    async save(file, idUser) {
        await this.#transformAvatar(file.path)
        await fs.rename(file.path, path.join(this.destination, file.filename))
        return path.normalize(path.join(idUser, file.filename))
    }
};

module.exports = UploadAvatar;