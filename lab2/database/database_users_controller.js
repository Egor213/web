const { json } = require('body-parser');
const fs = require('fs');
class DatabaseUsersController {
    constructor(path_database) {
        this.path = path_database

    }

    getJsonData() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const json_data = JSON.parse(data);
            return json_data;
        } catch(e) {
            console.error('Ошибка при открытии JSON хранилища', err);
            return false;
        }    
    }

    getCountUsers() {
        const json_data = this.getJsonData();
        const keyCount = Object.keys(json_data).length;
        return keyCount;
    }

    checkName(name) {
        if (typeof name !== 'string') {
            console.error('Имя пользователя не задано');
            return false;
        }
        const json_data = this.getJsonData();
        const lower_case_name = name.toLowerCase();
        const keys = Object.keys(json_data).map(key => key.toLowerCase());
        return keys.includes(lower_case_name);
    }
    

    addUser(name, password) {
        if (this.checkName(name)) {
            console.error('Такой пользователь уже есть');
            return false;
        }
        const json_data = this.getJsonData();
        json_data[name] = { password: password, books: {}};
        fs.writeFileSync(this.path, JSON.stringify(json_data, null, 4), 'utf8');
        return true;
    }

    getUser(name) {
        if (!this.checkName(name)) {
            return false;
        }
        const json_data = this.getJsonData();
        return json_data[name];
    }

    deleteUser(name) {
        const json_data = this.getJsonData();
        const lowerCaseName = name.toLowerCase();
        const keys = Object.keys(json_data).map(key => key.toLowerCase());
        const index = keys.indexOf(lowerCaseName);
        if (index !== -1) {
            const originalName = Object.keys(json_data)[index];
            delete json_data[originalName];
            fs.writeFileSync(this.path, JSON.stringify(json_data, null, 4), 'utf8');
            return true;
        } else {
            return false;
        }
    }


    getPassword(name) {
        const json_data = this.getJsonData();
        const lower_case_name = name.toLowerCase();
        const keys = Object.keys(json_data).map(key => key.toLowerCase());
        const index = keys.indexOf(lower_case_name);
        return index !== -1 ? json_data[Object.keys(json_data)[index]].password : null;
    }
}


module.exports = new DatabaseUsersController('database/database_users.json');