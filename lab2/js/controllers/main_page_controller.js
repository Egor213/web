const database_book = require("../../database/database_books_controller");

class MainPageController {
    addBook(req, res) {
        const { title, author } = req.query;
        if (!title || !author) {
            return res.status(400).json({ error: 'Title и author не найдены или такая книга уже существует' });
        }
        const book = database_book.addBook(title, author);
        if (book) {
            res.status(200).json({ message: "Книга создана"});
        } else {
            res.status(404).json({ error: 'Title и author не найдены' });
        }
    }

    deleteBook(req, res) {
        const { title, author } = req.query;
        if (!title || !author) {
            return res.status(400).json({ error: 'Title и author не найдены' });
        }
        const book = database_book.deleteBook(title, author);
        if (book) {
            res.status(200).json({ message: "Книга удалена"});
        } else {
            res.status(404).json({ error: 'Книга не найдена' });
        }
    }
}

module.exports = new MainPageController();