document.addEventListener('DOMContentLoaded', function() {
    fetch_books();
});

function fetch_books() {
    const bookList = document.getElementById('book-list');
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/api/book/all', true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const books = data.books;
            console.log(books);
        } else {
            console.error('Ошибка при получении данных:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Ошибка сети');
    };

    xhr.send();
}
