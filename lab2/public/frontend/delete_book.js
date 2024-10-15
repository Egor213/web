
export function delete_book(author, title) {
    const xhr = new XMLHttpRequest();
    const url = new URL('/api/main_page/delete_book', window.location.origin);
    url.searchParams.append('title', title);
    url.searchParams.append('author', author);
    xhr.open("DELETE", url.toString(), true);
    xhr.onload = function() {
        if (xhr.status === 404) {
            console.error("Книга не найдена!");
            return false;
        } else if (xhr.status === 200) {
            return true;
        }
    }
    xhr.onerror = function() {
        console.error('Ошибка запроса при добавлении книги:', xhr.statusText);
    };
    xhr.send();
    return true;
}