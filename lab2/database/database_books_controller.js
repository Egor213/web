const { json } = require('body-parser');
const fs = require('fs');
const { deleteBook } = require('../js/controllers/main_page_controller');
class DatabaseBooksController {
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

    checkBook(name, author) {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const json_data = JSON.parse(data);
            for (const key in json_data) {
                if (json_data[key].title === name && json_data[key].author === author) {
                    return true; 
                }
            }
            return false;
        } catch(e) {
            console.error('Ошибка при добавлении пользователя:', err);
            return false;
        }           
    }
 
    getBook(name, author) {
        if (!this.checkBook(name, author)) {
            return false;
        }
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const json_data = JSON.parse(data);
            for (const key in json_data) {
                if (json_data[key].title === name && json_data[key].author === author) {
                    return json_data[key]; 
                }
            }
            return false;
        } catch(e) {
            console.error('Ошибка при добавлении пользователя:', err);
            return false;
        }   
    }

    getAllBook() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const json_data = JSON.parse(data);
            return json_data;
        } catch(e) {
            console.error('Ошибка при добавлении пользователя:', err);
            return false;
        }   
    }

    getCountBooks() {
        return this.count_elems;
    }

    addBook(name, author, img=null) {
        if (this.checkBook(name, author)) {
            console.error('Такая книга уже есть');
            return false;
        }
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const json_data = JSON.parse(data);
            const new_book_key = `book ${this.count_elems + 1}`;
            json_data[new_book_key] = {
                title: name,
                author: author,
                owner: null,
                date_return: null,
                img: img
            };
            fs.writeFileSync(this.path, JSON.stringify(json_data, null, 2), 'utf8');
            this.count_elems += 1;
            return true;
        } catch(e) {
            console.error('Ошибка при добавлении пользователя:', err);
            return false;
        }   
    }

    deleteBook(name, author) {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const json_data = JSON.parse(data);
            const bookToDelete = Object.keys(json_data).find(key => {
                const book = json_data[key];
                return book.title === name && book.author === author;
            });

            if (bookToDelete) {
                delete json_data[bookToDelete];
                fs.writeFileSync(this.path, JSON.stringify(json_data, null, 2), 'utf8');
                this.count_elems -= 1;
                return true;
            } else {
                console.log('Книга не найдена.');
                return false; 
            }
        } catch (err) {
            console.error('Ошибка при удалении книги:', err);
            return false;
        }
    }
}


module.exports = new DatabaseBooksController('database/database_books.json');