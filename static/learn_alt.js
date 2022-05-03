function updateButtons() {
    let prev_button = $('#learn_prev_btn');
    let next_button = $('#learn_next_btn');
    let button_info = getButtons();
    console.log(button_info)
    let prev_info = button_info[0]
    let next_info = button_info[1]
    let prev_name = prev_info[0]
    let prev_url =  prev_info[1]
    let next_name = next_info[0]
    let next_url =  next_info[1]
    prev_button.attr('href',prev_url)
    prev_button.append('<i class="fa-solid fa-arrow-left"></i> ' + prev_name)
    next_button.attr('href',next_url)
    next_button.append(next_name + ' <i class="fa-solid fa-arrow-right"></i>')
}

function getButtons(){
    let current_url = window.location.pathname
    for (let content of Object.entries(contents)) {
        if (content[1].url === current_url) {
            let prev_id = content[1].prev_id
            console.log(contents[prev_id])
            let prev_name = contents[prev_id].short_title
            let prev_url = contents[prev_id].url
            let next_id = content[1].next_id
            let next_name = contents[next_id].short_title
            let next_url = contents[next_id].url
            return [[prev_name, prev_url],[next_name, next_url]]
        }
    }
}

$(document).ready(function(){
    updateButtons()
    $('.learn_button').click(function () {
        window.location.href = $(this).attr('href')
    })
})