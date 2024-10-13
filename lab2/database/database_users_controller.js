const { json } = require('body-parser');
const fs = require('fs');
class DatabaseUsersController {
    constructor(path_database) {
        this.path = path_database
        this.count_elems = () => {
            try {
                const data = fs.readFileSync(this.path, 'utf8');
                const json_data = JSON.parse(data);
                const keyCount = Object.keys(json_data).length;
                return keyCount;
            } catch (err) {
                console.error('Ошибка при чтении файла:', err);
                return 0;
            }
        };
    }

    checkName(name) {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const json_data = JSON.parse(data);
            return Object.keys(json_data).includes(name);
        } catch (err) {
            console.error('Ошибка чтения или парсинга файла:', err);
            return false;
        }
    }

    addUser(name, password) {
        if (this.checkName(name)) {
            console.error('Такой пользователь уже есть');
            return false;
        }
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const json_data = JSON.parse(data);
            json_data[name] = { password: password, books: {}};
            fs.writeFileSync(this.path, JSON.stringify(json_data, null, 4), 'utf8');
            this.count_elems += 1;
            return true;
        } catch(e) {
            console.error('Ошибка при добавлении пользователя:', err);
            return false;
        }
    }

    getUser(name) {
        if (!this.checkName(name)) {
            return false;
        }
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const json_data = JSON.parse(data);
            return json_data[name];
        } catch (err) {
            console.error('Ошибка чтения или парсинга файла:', err);
            return false;
        }
    }

    deleteUser(name) {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const json_data = JSON.parse(data);
            if (this.checkName(name)) {
                delete json_data[name];
                fs.writeFileSync(this.path, JSON.stringify(json_data, null, 4), 'utf8');
                this.count_elems -= 1;
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error('Ошибка при удалении пользователя:', err);
            return false;
        }
    }

    getCountUsers() {
        return this.count_elems;
    }
}


module.exports = new DatabaseUsersController('database/database_users.json');