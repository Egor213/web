

$(document).ready(() => {
    render_news_user();
})

function render_news_user() {
    const id = get_id_by_url();
    $.get(`/api/user/news/${id}`, function(response) {
        console.log(response);
    });
}

function get_id_by_url() {
    let url = window.location.pathname;
    const segments = url.split('/');
    return segments[segments.length - 1];
}