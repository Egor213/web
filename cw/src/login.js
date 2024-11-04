function store(value) {
    localStorage.setItem("game.username", value);
}

function login(event) {
    event.preventDefault();
    const name_input = document.querySelector('.input-login-box input'); 
    const name = name_input.value;
    store(name);
    window.location.href = '../html/game.html'; 
}

document.addEventListener('DOMContentLoaded', function() {
    let input_name = document.querySelector('.input-login-box input');
    if (input_name !== null) {
        let store_name = localStorage.getItem('game.username');
        if (store_name) {
            input_name.value = store_name;
        }
    }
});
