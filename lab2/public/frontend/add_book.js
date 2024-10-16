import { delete_book } from "./delete_book.js"

function select_book(id) {
    const url = `http://localhost:3000/api/book_page/?id=${id}`; 
    window.location.href = url;
}
let item_count = 0; 
export function add_book_event() {
    const add_button = document.querySelector('.add-book input[type="button"]');
    const window_card = document.querySelector(".add-book-window");
    add_button.addEventListener('click', function() {
        window_card.style.display = 'block';
        const author_input = document.querySelector('.author-book input[type="text"]');
        const title_input = document.querySelector('.title-book input[type="text"]');
        const file_input = document.querySelector('.img-book input[type="file"]');
        title_input.value = '';
        author_input.value = '';
        file_input.value = '';
    });
}

function parse_books(responseText) {
    const data = JSON.parse(responseText);
    const books = data.books;
    Object.keys(books).forEach(key => {
        const id_book = Number(key.split(' ')[1]);
        add_book(id_book, books[key]);
    });
}

export function load_books() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:3000/api/book/all', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            parse_books(xhr.responseText);
        } else {
            console.error('Ошибка при получении данных:', xhr.statusText);
        }
    }
    xhr.onerror = function() {
        console.error('Ошибка сети');
    };

    xhr.send();

}

export function add_book(id_book, book_data) {
    item_count++;
    create_div_card_book(book_data, id_book);
    add_height();
}

function get_count_in_line() {
    const screen_width = window.innerWidth;
    let count_in_line = 4;
    if (screen_width <= 600) {
        count_in_line = 1
    } else if (screen_width <= 900) {
        count_in_line = 2
    } else if (screen_width <= 1200) {
        count_in_line = 3
    }
    return count_in_line;
}


function add_height() {
    let count_in_line = get_count_in_line();
    if (item_count % count_in_line === 1 && item_count > (count_in_line)) {
        const container = document.querySelector('.container');
        const currentHeight = container.offsetHeight;
        const newHeight = currentHeight + 650;
        container.style.height = newHeight + 'px';
    }
}

function del_height() {
    let count_in_line = get_count_in_line();
    if (item_count % count_in_line === 0 && item_count >= count_in_line) {
        const container = document.querySelector('.container');
        const currentHeight = container.offsetHeight;
        const newHeight = currentHeight - 650;
        container.style.height = newHeight + 'px';
    }
}

function create_div_card_book(book_obj, id_book) {
    const book_list = document.querySelector('.grid');
    const new_item = document.createElement('div');
    new_item.classList.add('card-book');
    new_item.dataset.id_book = id_book;

    const img = document.createElement('div');
    img.classList.add('img-card-book');

    const author = document.createElement('div');
    author.classList.add('author-card-book');

    const title = document.createElement('div');
    title.classList.add('title-card-book');

    const ret_date = document.createElement('div');
    ret_date.classList.add('ret-date-card-book');
    

    const buttons = document.createElement('div');
    buttons.classList.add('buttons-card-book');

    const button_select = document.createElement('div');
    button_select.classList.add('button-select-card-book');

    const button_select_input = document.createElement('input');
    button_select_input.classList.add('button-select-input-card-book');
    button_select_input.type = 'button'; 
    button_select_input.id = 'add-book-button'; 
    button_select_input.value = 'Выбрать'; 

    const button_delete = document.createElement('div');
    button_delete.classList.add('button-delete-card-book');

    const button_delete_input = document.createElement('input');
    button_delete_input.classList.add('button-delete-input-card-book');
    button_delete_input.type = 'button'; 
    button_delete_input.id = 'add-book-button'; 
    button_delete_input.value = 'Удалить'; 

    button_delete_input.addEventListener("click", function(){
        const hope = confirm("Подтвердить удаление?");
        if (hope) {
            if (delete_book(book_obj["author"], book_obj["title"])) {
                new_item.remove();
                item_count--;
                del_height();
            }
        }
    })

    button_select_input.addEventListener("click", function(){
        select_book(id_book);
    })
    
    book_list.appendChild(new_item);
    new_item.appendChild(img);
    new_item.appendChild(author);
    new_item.appendChild(title);
    new_item.appendChild(ret_date);
    new_item.appendChild(buttons);
    buttons.appendChild(button_select);
    buttons.appendChild(button_delete);
    button_delete.appendChild(button_delete_input);
    button_select.appendChild(button_select_input);

    author.textContent = book_obj["author"];
    title.textContent = book_obj["title"];

    if (book_obj["date_return"])
        ret_date.textContent = "Дата возврата: " + book_obj["date_return"];
    else
        ret_date.textContent = "Дата возврата: не определена";

    if (book_obj["img"])
        img.style.backgroundImage = `url(${book_obj["img"]})`;
    else
    {
        img.style.backgroundImage = null;
        img.textContent = 'Обложки нет';
    }
}


export function send_button_book() {
    const send_button = document.querySelector('.send-button input[type="submit"]');
    send_button.addEventListener('click', function(event) {
        event.preventDefault(); 

        const file_input = document.querySelector('.img-book input[type="file"]');
        const author_input = document.querySelector('.author-book input[type="text"]');
        const title_input = document.querySelector('.title-book input[type="text"]');
        if (!author_input.value || !title_input.value) {
            alert("Вы не ввели автора или название книги!")
            return;
        }
        const file = file_input.files[0];

        if (file) {
            const form_data = new FormData();
            form_data.append('file', file);       
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/api/upload", true); 
            xhr.onload = function() {
                if (xhr.status === 200) {
                    console.log('Изображение загружено успешно:', xhr.responseText);
                    const path_file = xhr.responseText; 
                    send_book_info(title_input.value, author_input.value, path_file);
                } else {
                    console.error('Ошибка при загрузке изображения:', xhr.statusText);
                }
            };
            xhr.onerror = function() {
                console.error('Ошибка запроса:', xhr.statusText);
            };
            xhr.send(form_data);
        } else {
            console.log("Файла нет");
            send_book_info(title_input.value, author_input.value, null);
        }
    });
}

function send_book_info(title, author, path_file) {
    const xhr = new XMLHttpRequest();
    const url = new URL('/api/main_page/add_book', window.location.origin);
    url.searchParams.append('title', title);
    url.searchParams.append('author', author);
    if (path_file) {
        url.searchParams.append('img', path_file); 
    }
    xhr.open("POST", url.toString(), true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Книга добавлена успешно:', xhr.responseText);
            const window_card = document.querySelector(".add-book-window");
            window_card.style.display = 'none';
            const data = {
                author: author,
                title: title,
                img: path_file
            }
            add_book(JSON.parse(xhr.responseText).id, data)
        } else if (xhr.status === 404) {
            alert('Такая книга уже существует!');
        } else{
            console.error('Ошибка при добавлении книги:', xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Ошибка запроса при добавлении книги:', xhr.statusText);
    };
    xhr.send(); 
}


export function close_add_window() {
    const close = document.querySelector(".close-window i");
    const window_card = document.querySelector(".add-book-window");
    close.addEventListener("click", function() {
        window_card.style.display = 'none';
    })
}




function close_open_window(open) {
    const win_filter = document.querySelector(".filter-window")
    if (open)
        win_filter.style.display = 'block';
    else
        win_filter.style.display = 'none';
}
export function close_filter_window() {
    const but = document.querySelector(".close-filter-window i")
    but.addEventListener('click', () => {
        close_open_window(false)
    })
}

export function open_filter_window() {
    const but = document.querySelector(".sort input[type='button']")
    but.addEventListener('click', () => {
        close_open_window(true);
    })
}

function clear_all_div() {
    const parentDiv = document.querySelector('.grid');
    while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
    }
    const temp = Math.floor(item_count / get_count_in_line());
    console.log(temp);
    const container = document.querySelector('.container');
    const currentHeight = container.offsetHeight;
    const newHeight = currentHeight -(650 * temp);
    container.style.height = newHeight + 'px';
    item_count = 0;
}


export function send_filter_window() {
    const but = document.querySelector(".send-button-filter-window input[type='button']");
    const have_filter = document.getElementById('have-filter');
    const lose_data_filter = document.getElementById('lose-data-filter');
    but.addEventListener('click', () => {
        if (!have_filter.checked && !lose_data_filter.checked) {
            clear_all_div();
            load_books();
            close_open_window(false)
            return;
        }
        if (lose_data_filter.checked) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/main_page/filter_ret_date")
            xhr.onload = function() {
                if (xhr.status == 200) {
                    clear_all_div();
                    parse_books(xhr.responseText);
                }
            };
            xhr.send(); 
        } else {
            const xhr = new XMLHttpRequest();
            const url = new URL('/api/main_page/filter_owner', window.location.origin);
            url.searchParams.append('owner', localStorage['login']);
            xhr.open("GET", url.toString(), true);
            xhr.onload = function() {
                if (xhr.status == 200) {
                    clear_all_div();
                    parse_books(xhr.responseText);
                }
            };
            xhr.send(); 
        }

        close_open_window(false)
    })
    
}