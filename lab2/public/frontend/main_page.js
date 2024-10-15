import {add_book_event, send_button_book, close_add_window, close_filter_window, open_filter_window, send_filter_window, load_books  } from './add_book.js';



document.addEventListener("DOMContentLoaded", function() {
    load_books();
    add_book_event();
    close_add_window();
    send_button_book();
    close_filter_window();
    open_filter_window();
    send_filter_window();
})




function toggle_checkboxes() {
    const have_filter = document.getElementById('have-filter');
    const lose_data_filter = document.getElementById('lose-data-filter');

    if (have_filter.checked) {
        lose_data_filter.disabled = true;
    } else {
        lose_data_filter.disabled = false;
    }

    if (lose_data_filter.checked) {
        have_filter.disabled = true;
    } else {
        have_filter.disabled = false;
    }
}


window.toggle_checkboxes = toggle_checkboxes;