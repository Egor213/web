function get_id_by_url() {
    let url = window.location.pathname;
    const segments = url.split('/');
    return segments[segments.length - 1];
}

$('#friends').on('click', function(){
    const id = get_id_by_url();
    window.location.href = `/user/friends/${id}`;
})


$('#news').on('click', function(){
    const id = get_id_by_url();
    window.location.href = `/user/news/${id}`;
})

function main() {
    render_name_user();
    render_information();
    change_params();
}

function add_name_user(name) {
    $("#user-title").text(name);
}


function render_name_user() {
    const id = get_id_by_url();
    $.get(`/api/user/get_name/${id}`, function(response) {
        add_name_user(response);
    });
}

function render_information() {
    const id = get_id_by_url();
    $.get(`/api/user/get_info_user/${id}`, function(response) {
        let user = `
            <img src="${response.img}" alt="Фото пользователя" width="256" height="256" class="mb-2">
            <h5> id: ${response.id} </h5>
            <h5 id='name' class='break-word'> Name: ${response.name} </h5>
            <h5 id='date'> Date: ${response.date} </h5>
            <h5 id='email' class='break-word'> Email: ${response.email} </h5>
            <h5 id='role'> Role: ${response.role} </h5>
            <h5 id='status'> Status: ${response.status} </h5>
        `
        $('#info').append(user);
    });
    
}

function change_params() {
    $('#confirm-btn').on('click', function() {
        const status = $('#status-selector').val() == "Выберите действие" ? "" : $('#status-selector').val();
        const role = $('#role-selector').val() == "Выберите действие" ? "" : $('#role-selector').val(); 
        const dict_status = {
            "act": "Активный",
            "lock": "Заблокированный",
            "no-сonf": "Не подтвержденный"
        }
        const dict_role = {
            "admin": "Администратор",
            "user": "Пользователь"
        }
        const name = $('#name-input').val(); 
        const date = $('#date-input').val(); 
        const email = $('#email-input').val();
        const form_data = {
            id: get_id_by_url(),
            status: dict_status[status],
            role: dict_role[role],
            name: name,
            date: date,
            email: email
        };
        $.ajax({
            url: 'http://localhost:3000/api/user/change_params/',
            type: 'PUT', 
            contentType: 'application/json', 
            data: JSON.stringify(form_data),
            success: function(response) {
                alert('Данные обновлены');
                set_new_info(form_data);
            },
            error: function(xhr, status, error) {
                console.log(xhr, status, error)
                alert("Ошибка обновления данных")
            }
        });
    })
}

function set_new_info(form_data) {
    for (let key in form_data) {
        if (form_data[key] && key !== "id") {
            if (key == 'name')
                $($("#user-title")).text(`${form_data[key]}`)
            if (key == 'date')
                $(`#${key}`).text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${reform_date(form_data[key])}`)
            else
                $(`#${key}`).text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${form_data[key]}`)
        }
    }
}

function reform_date(date) {
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
}

main();