const { json } = require('body-parser');
const fs = require('fs');
const Param = require("./Enums");
class DatabaseBooksController {
    constructor(path_database) {
        this.path = path_database;
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

    checkBook(name, author) {
        const json_data = this.getJsonData();
        for (const key in json_data) {
            if (json_data[key].title === name && json_data[key].author === author) {
                return true; 
            }
        }
        return false;          
    }
 
    getBook(name, author) {
        if (!this.checkBook(name, author)) {
            return false;
        }
        const json_data = this.getJsonData();
        for (const key in json_data) {
            if (json_data[key].title === name && json_data[key].author === author) {
                return json_data[key]; 
            }
        }
        return false;
    }

    getAllBook() {
        return this.getJsonData();
    }

    getCountBooks() {
        const json_data = this.getJsonData();
        const keyCount = Object.keys(json_data).length;
        return keyCount;
    }

    addBook(name, author, img=null) {
        if (this.checkBook(name, author)) {
            console.error('Такая книга уже есть');
            return false;
        }
        const json_data = this.getJsonData();
        const count = this.findMaxBookNumber();
        const new_book_key = `book ${count + 1}`;
        json_data[new_book_key] = {
            title: name,
            author: author,
            owner: null,
            date_return: null,
            img: img
        };
        this.saveJsonData(json_data);
        return count + 1;
    }

    getBookById(id) {
        const json_data = this.getJsonData();
        const book_find = `book ${id}`;
        const book = json_data[book_find];
        if (book) 
            return book;
        else
            return false;
    }

    deleteBook(name, author) {
        const json_data = this.getJsonData();
        const bookToDelete = Object.keys(json_data).find(key => {
            const book = json_data[key];
            return book.title === name && book.author === author;
        });

        if (bookToDelete) {
            delete json_data[bookToDelete];
            this.saveJsonData(json_data);
            return true;
        } else {
            console.log('Книга не найдена.');
            return false; 
        }
    }

    findMaxBookNumber() {
        const json_data = this.getJsonData();
        let maxNumber = 0;
        for (const key in json_data) {
            const match = key.match(/book (\d+)/);
            if (match) {
                const number = parseInt(match[1], 10);
                if (number > maxNumber) {
                    maxNumber = number;
                }
            }
        }
        return maxNumber;
    }

    saveJsonData(json_data) {
        try {
            fs.writeFileSync(this.path, JSON.stringify(json_data, null, 2), 'utf8');
        } catch (err) {
            console.error('Ошибка при сохранении данных:', err);
        }
    }

    changeParam(param, id, value=0) {
        const json_data = this.getJsonData();
        const book_key = `book ${id}`;
        const book = json_data[book_key];

        if (!book) {
            console.error('Книга не найдена.');
            return false;
        }

        switch (param) {
            case Param.AUTHOR:
                book.author = value;
                break;
            case Param.TITLE:
                book.title = value;
                break;
            case Param.RET_DATA:
                book.date_return = value; 
                break;
            case Param.SET_OWNER:
                book.owner = value; 
                break;
            case Param.DEL_OWNER:
                book.owner = null; 
                break;
            case Param.DEL_RET_DATA:
                book.date_return = null; 
                break;                
            default:
                console.error('Неизвестный параметр:', param);
                return false;
        }
        this.saveJsonData(json_data);
        return true;
    }
}


module.exports = new DatabaseBooksController('database/database_books.json');