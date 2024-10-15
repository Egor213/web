// Функция для обработки клика на кнопке "Изменить автора"

function get_id_book() {
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString); 
    const id = urlParams.get('id'); 
    return id;
}

function change(optional) {
    const id = get_id_book();
    const ans = prompt("Напишите новое значение:");
    const xhr = new XMLHttpRequest();
    let str = '/api/book/' + optional
    const url = new URL(str, window.location.origin);
    url.searchParams.append('id', id);
    url.searchParams.append('value', ans);
    xhr.open("PUT", url.toString(), true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const url_per = `http://localhost:3000/api/book_page/?id=${id}`; 
            window.location.href = url_per;
        } else if (xhr.status == 404) {
            alert("Не удалось обновить данные!")
        }
    }
    xhr.send();
}

function deleteChange(optional) {
    const id = get_id_book();
    const xhr = new XMLHttpRequest();
    let str = '/api/book/' + optional
    const url = new URL(str, window.location.origin);
    url.searchParams.append('id', id);
    xhr.open("DELETE", url.toString(), true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const url_per = `http://localhost:3000/api/book_page/?id=${id}`; 
            window.location.href = url_per;
        } else if (xhr.status == 404) {
            alert("Не удалось обновить данные!")
        }
    }
    xhr.send();
}

function editAuthor() {
    change('change_author')
}

function editTitle() {
    change('change_title')
}

function editReturnDate() {
    change('set_return_data')
}


function issueBook() {
    change('set_owner')
}


function returnBook() {
    deleteChange('delete_owner')
}

function delRetDate() {
    deleteChange('delete_return_data')
}

// Привязка функций к кнопкам
function bindButtonEvents() {
    document.querySelector("#changeAuthor").addEventListener("click", editAuthor);
    document.querySelector("#changeTitle").addEventListener("click", editTitle);
    document.querySelector("#changeRetDate").addEventListener("click", editReturnDate);
    document.querySelector("#giveBook").addEventListener("click", issueBook);
    document.querySelector("#returnBook").addEventListener("click", returnBook);
    document.querySelector("#DelRetDate").addEventListener("click", delRetDate);
    // Обработчик кнопки "Вернуться назад"
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener("click", () => {
        window.location.href = 'http://localhost:3000/main_page';
    });
}

// Выполняем привязку событий после загрузки страницы
document.addEventListener("DOMContentLoaded", bindButtonEvents);
