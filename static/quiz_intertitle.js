function getStars() {
    let stars = "";
    let count = 0;

    for (let j = 1; j <= score; j++) {
        stars += '<i class="fa-solid fa-star quiz_intertitle_stars"></i>';
        count += 1
    }

    for (let j = 1; j <= (total - count); j++) {
        stars += '<i class="fa-regular fa-star quiz_intertitle_stars"></i>';
    }
    $('.quiz_intertitle_star_div').append(stars)
}

function getNextButton() {
    let button_text = '';
    let next_url = '';
    if (level === '1') {
        button_text = '2';
        next_url = '/quiz/2/1'
    } else {
        button_text = '3';
        next_url = '/quiz/3/1'
    }
    $('#quiz_intertile_button').append('Level ' + button_text + '   <i class="fa-solid fa-arrow-right"></i>')
    $("#quiz_intertile_button").click(function () {
        window.location.href = next_url
    })
}

$(document).ready(function () {
    getStars()
    getNextButton()
})
