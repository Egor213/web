let database_users = require('../../database/database_users_controller');
const database_book = require("../../database/database_books_controller");
class BookPageController {
    render_page(req, res) {
        const { id } = req.query;
        let book = database_book.getBookById(id);
        let temp = book.img
        let cleanImgPath = null;
        if (temp)
            cleanImgPath = "/" + temp.replace(/^(\.\.\/)+/, '');
        res.render('book_page.pug', { title:book.title, author:book.author, owner:book.owner, date_return:book.date_return, img:cleanImgPath });
    }
}

module.exports = new BookPageController();
