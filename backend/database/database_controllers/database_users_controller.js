const fs = require('fs');
const { json } = require('body-parser');
const path = require('path');
const db_news = require(path.join(__dirname, 'database_news_controller'));
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

    getUserById(id) {
        const data = this.getArrData();
        for (let index in data) {
            if (data[index].id == id) 
                return data[index];
        }
        return false;
    }

    getIdFriendsUser(id) {
        const user = this.getUserById(id);
        if (user)
            return user.friends;
        return false;
    }

    getNameUser(id) {
        const user = this.getUserById(id);
        if (user)
            return user.name;
        return false;
    }

    getJSONFriendsUser(id) {
        const data = this.getArrData();
        const id_friends = this.getIdFriendsUser(id);
        if (!id_friends)
            return false;
        const dest_json = [];
        for (let index in data) {
            if (id_friends.includes(data[index].id)) {
                dest_json.push(data[index])
            }
        }
        return dest_json;
    }

    getImgUser(id) {
        const user = this.getUserById(id);
        if (user)
            return user.img;
        return false;
    }

    getNewsFriends(id) {
        const friends = this.getIdFriendsUser(id);
        const temp_json = [];
        for (let index in friends) {
            const data = db_news.getNewsById(friends[index]);
            if (data) {
                data.name = this.getNameUser(friends[index]);
                data.img = this.getImgUser(friends[index]);
                temp_json.push(data); 
            }
        }
        return temp_json;
    }

    saveJsonData(json_data) {
        try {
            const data = {
                users: json_data
            }
            fs.writeFileSync(this.path, JSON.stringify(data, null, 2), 'utf8');
            return true;
        } catch (err) {
            console.error('Ошибка при сохранении данных:', err);
            return false;
        }
    }

    isValidDate(date_string) {
        const regex = /^\d{4}\-\d{2}\-\d{2}$/;
        if (!regex.test(date_string)) {
            return false;
        }

        const parts = date_string.split('-');
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        if (month < 1 || month > 12)
            return false;
        const days_in_month = new Date(year, month, 0).getDate();
        return day > 0 && day <= days_in_month && year < 2024 && year > 1850;
    }

    changeParam(value_obj, id) { 
        if (!value_obj || !id) {
            console.error('Неверное значение value: ', value_obj, " id: ", id);
            return false;
        }
        const data = this.getArrData();
        for (let user of data) {
            if (user.id == id) {
                for (let key in value_obj) {
                    if (value_obj[key]) {
                        console.log(value_obj[key])
                        if (key === 'date')
                            if (this.isValidDate(value_obj[key]))
                                user[key] = value_obj[key]
                            else
                                return false;
                        else
                            user[key] = value_obj[key]
                    }
                        
                }
                if (this.saveJsonData(data))
                    return true;
            }
        }
        return false
        
    }
}
module.exports = new DatabaseUsersController(path.join(__dirname, '..', 'database_json', 'users.json'));