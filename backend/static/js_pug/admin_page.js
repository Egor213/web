

function render_all_users() {
    $.get('/api/admin', function(response) {
        render_cards_users(response);
    });
}

function render_cards_users(users) {
    for (let index in users) {
        let user = `
            <div class="col-sm-6 col-md-4 col-xf-md-1 d-flex justify-content-center">
                <div class="card m-2 w-100">
                    <div class="card-body">
                        <h4 class="card-title">Пользователь ${users[index]['id']}</h2>
                        <p class="card-text">Имя: ${users[index]['name']}</p>
                        <p class="card-text">Дата рождения: ${users[index]['date']}</p>
                        <p class="card-text">email: ${users[index]['email']}</p>
                        <p class="card-text">Роль: ${users[index]['role']}</p>
                        <p class="card-text">Статус: ${users[index]['status']}</p>
                        <a class="btn btn-secondary mb-1" href="#">Новости</a>
                        <a class="btn btn-secondary mb-1" href="#">Редактировать</a>
                    </div>
                </div>
            </div>
         `
        $('#users').append(user)
    }
}

module.exports = render_all_users;