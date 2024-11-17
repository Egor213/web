

$(document).ready(() => {
    render_friends_user();
    render_name_user();
})

function render_friends_user() {
    const id = get_id_by_url();
    $.get(`/api/user/friends/${id}`, function(response) {
        add_friends(response);
    });
}

function render_name_user() {
    const id = get_id_by_url();
    $.get(`/api/user/get_name/${id}`, function(response) {
        add_name_user(response);
    });
}

function add_name_user(name) {
    $("#user-title").text(name);
}

function add_friends(friends) {
    for (let friend of friends) {
        let data = `
            <div class="col-12 d-flex justify-content-center">
                <div class="card m-2 card-custom-width">
                    <div class="card-body">
                        <h2 class="card-title">Имя: ${friend['name']}</h2>
                        <p class="card-text">Дата рождения: ${friend['date']}</p>
                        <p class="card-text">Почтовый адрес: ${friend['email']}</p>
                        <p class="card-text">Роль: ${friend['role']}</p>
                        <p class="card-text">Статус: ${friend['status']}</p>
                        <p class="card-text">id в системе: ${friend['id']}</p>
                    </div>
                </div>
            </div>

        `
        $('#user').append(data);
    }
}

function get_id_by_url() {
    let url = window.location.pathname;
    const segments = url.split('/');
    return segments[segments.length - 1];
}