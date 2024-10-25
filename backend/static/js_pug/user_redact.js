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

// $(document).ready(() => {
//     // render_friends_user();
//     render_name_user();
// })
function main() {
    render_name_user();
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



main();