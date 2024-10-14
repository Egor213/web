const database_book = require("../../database/database_books_controller");
const Param = require("../../database/Enums")
class BookCardController {
    getBook(req, res) {
        let book = database_book.getBookById(req.params.id);
        if (book) {
            res.json({ book });
        } else {
            res.status(404).json({error: "not found"});
        }
    }

    getAllBook(req, res) {
        let books = database_book.getAllBook();
        if (books) {
            res.json({ books });
        } else {
            res.status(404).json({error: "not found"});
        }
    }

    changeAuthor(req, res) {
        let param = Param.AUTHOR;
        let operation = database_book.changeParam(param, req.query.id, req.query.value);
        if (!operation) {
            res.status(404).json({error: "Не удалось обновить автора"});
        }
        res.status(200).json({ message: "Автор обновлен"});
    }

    changeTitle(req, res) {
        let param = Param.TITLE;
        let operation = database_book.changeParam(param, req.query.id, req.query.value);
        if (!operation) {
            res.status(404).json({error: "Не удалось обновить название"});
        }
        res.status(200).json({ message: "Название обновлен"});
    }
    
    setReturnData(req, res) {
        let param = Param.RET_DATA;
        let operation = database_book.changeParam(param, req.query.id, req.query.value);
        if (operation) {
            res.status(200).json({ message: "Дата возврата обновлен"});
        }
        res.status(404).json({error: "Не удалось обновить дату возврата"});
    }

    setOwner(req, res) {
        let param = Param.SET_OWNER;
        let operation = database_book.changeParam(param, req.query.id, req.query.value);
        if (!operation) {
            res.status(404).json({error: "Не удалось установить владельца"});
        }
        res.status(200).json({ message: "Владелец установлен"});
    }

    deleteOwner(req, res) {
        let param = Param.DEL_OWNER;
        let operation = database_book.changeParam(param, req.query.id, req.query.value);
        if (!operation) {
            res.status(404).json({error: "Не удалось удалить владельца"});
        }
        res.status(200).json({ message: "Владелец удален"});
    }

    deleteReturnData(req, res) {
        let param = Param.DEL_RET_DATA;
        let operation = database_book.changeParam(param, req.query.id, req.query.value);
        if (!operation) {
            res.status(404).json({error: "Не удалось удалить дату"});
        }
        res.status(200).json({ message: "Дата возврата удален"});
    }

}

module.exports = new BookCardController();