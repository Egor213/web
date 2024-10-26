function get_id_by_url() {
    let url = window.location.pathname;
    const segments = url.split('/');
    return segments[segments.length - 1];
}

$('#friends').on('click', function() {
    const id = get_id_by_url();
    window.location.href = `/user/friends/${id}`;
})


$('#redact').on('click', function(){
    const id = get_id_by_url();
    window.location.href = `/user/redact/${id}`;
})


function main() {
    render_name_user();
    render_news_user();
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


function render_news_user() {
    const id = get_id_by_url();
    $.get(`/api/user/news/${id}`, function(response) {
        add_all_news(response);
    }).fail(function(res) {
        $('#news').append(
            `
            <div class="col-12 d-flex justify-content-center">
                <h2>Новости не найдены</h2>
            </div>
            `
        );
    });
}


function add_all_news(all_news) {
    for (let news of all_news) {
        for (let element of news.posts) {
            add_news_user(news.name, element, news.img);
        }
    }
}

function add_news_user(name, news, img) {
    let data = `
        <div class="col-12 d-flex justify-content-center">
            <div class="card m-2 card-custom-width">
                <div class="card-body">
                    <img src="${img}" alt="Фото пользователя" width="48" height="48" class="mb-2">
                    <h2 class="card-title">${name}</h2>
                    <p class="card-text">${news}</p>
                </div>
            </div>
        </div>
    `
    $('#news').append(data);
}


main();
                            
