const fs = require('fs');
const { json } = require('body-parser');
const path = require('path');

class DatabaseNewsController {
    constructor(path_database) {
        this.path = path_database;
    }

    getArrData() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const json_data = JSON.parse(data);
            return json_data['news'];
        } catch(e) {
            console.error("Ошибка при открытий JSON файла");
            return false;
        }
    }


    getAllNews() {
        return this.getArrData();
    }

    getNewsById(id) {
        const data = this.getArrData();
        for (let index in data) {
            if (id == data[index])
                return data[index];
        }
        return false;
    }
}
module.exports = new DatabaseNewsController(path.join(__dirname, '..', 'database_json', 'news.json'));