const uuid = require('uuid');
const path = require('path');
const ApiError = require('../exceptions/api.error');


class FileService {
    saveFile(file) {
        try {
            // create random file name.jpg
            const fileName = uuid.v4() + '.jpg';

            // path to folder
            const filePath = path.resolve('static', fileName);

            // save file in static
            file.mv(filePath);

            return fileName;
        } catch (e) {
            throw ApiError.InternalServerError('Ошибка создания файла!');
        }
    }
}


module.exports = new FileService();