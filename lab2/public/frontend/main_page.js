
let item_count = 0; 
document.addEventListener("DOMContentLoaded", function() {
    load_books();
    add_book_event();
    close_add_window();
})

function load_books() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:3000/api/book/all', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const books = data.books;
            Object.keys(books).forEach(key => {
                const id_book = Number(key.split(' ')[1]);
                add_book(id_book, books[key]);
            });
        } else {
            console.error('Ошибка при получении данных:', xhr.statusText);
        }
    }


    xhr.onerror = function() {
        console.error('Ошибка сети');
    };

    xhr.send();

}


function add_book_event() {
    const add_button = document.querySelector('.add-book input[type="button"]');
    const window_card = document.querySelector(".add-book-window");
    add_button.addEventListener('click', function() {
        window_card.style.display = 'block';
    });

    

}

function add_book(id_book, book_data) {
    item_count++;
    create_div_card_book(book_data, id_book);
    const screen_width = window.innerWidth;
    let count_in_line = 4;
    if (screen_width <= 600) {
        count_in_line = 1
    } else if (screen_width <= 900) {
        count_in_line = 2
    } else if (screen_width <= 1200) {
        count_in_line = 3
    }

    if (item_count % count_in_line === 1 && item_count > (count_in_line)) {
        const container = document.querySelector('.container');
        const currentHeight = container.offsetHeight;
        const newHeight = currentHeight + 650;
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


function close_add_window() {
    const close = document.querySelector(".close-window i");
    const window_card = document.querySelector(".add-book-window");
    close.addEventListener("click", function() {
        window_card.style.display = 'none';
    })
}
