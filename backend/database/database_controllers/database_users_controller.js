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

    getAllUsers() {
        return this.getArrData();
    }

    getIdFriendsUser(id) {
        const data = this.getArrData();
        for (let index in data) {
            if (data[index].id == id) {
                return data[index].friends;
            }
        }
        return false;
    }

    getJSONFriendsUser(id) {
        const data = this.getArrData();
        const id_friends = this.getIdFriendsUser(id);
        const dest_json = {};
        for (let index in data) {
            if (id_friends.includes(data[index].id)) {
                dest_json.push(data[index])
            }
        }
        return dest_json;
    }
}
module.exports = new DatabaseUsersController(path.join(__dirname, '..', 'database_json', 'users.json'));