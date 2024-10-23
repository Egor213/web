const fs = require('fs');
const { json } = require('body-parser');
const path = require('path');
class DatabaseUsersController {
    constructor(path_database) {
        this.path = path_database;
    }

    getArrData() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const json_data = JSON.parse(data);
            return json_data['users'];
        } catch(e) {
            console.error("Ошибка при открытий JSON файла");
            return false;
        }
    }

    getMaxId() {
        const data = this.getArrData();
        let max_id = 0;
        for (let index in data) {
            const id = data[index]['id'];
            max_id = id > max_id ? id : max_id;
        }
        return max_id;
    }

    getAllUsers() {
        return this.getArrData();
    }
}
module.exports = new DatabaseUsersController(path.join(__dirname, '..', 'database_json', 'users.json'));