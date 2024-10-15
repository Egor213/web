const database_book = require("../../database/database_books_controller");

class MainPageController {
    addBook(req, res) {
        const { title, author, img } = req.query;
        if (!title || !author) {
            return res.status(404).json({ error: 'Title и author не найдены или такая книга уже существует' });
        }
        const book = database_book.addBook(title, author, img);
        if (book) {
            res.status(200).json({ id:book,  message: "Книга создана"});
        } else {
            res.status(404).json({ error: 'Title и author не найдены или такая книга уже существует' });
        }
    }

    deleteBook(req, res) {
        const { title, author } = req.query;
        if (!title || !author) {
            return res.status(404).json({ error: 'Title и author не найдены' });
        }
        const book = database_book.deleteBook(title, author);
        if (book) {
            res.status(200).json({ message: "Книга удалена"});
        } else {
            res.status(404).json({ error: 'Книга не найдена' });
        }
    }

    filter_owner(req, res) {
        const { owner } = req.query;
        const books = database_book.getOwnBooks(owner);
        res.json({ books });
    }

    filter_ret_data(req, res) {
        const books = database_book.getLoseRetData();
        res.json({ books });
    }
}

module.exports = new MainPageController();