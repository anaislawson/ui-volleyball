let score = 0;

function displayQuestion(question) {

    let quizHeaderContainer = $('#level_1_question_header');
    let questionContainer = $('#level_1_question');
    let optionContainer = $('#level_1_options');
    let scoreContainer = $('#level_1_score');

    quizHeaderContainer.append('Question ' + question.question_id)
    questionContainer.append(question.question)
    scoreContainer.append(score)

    for (let option in question.options) {
        let option_text = question.options[option]
        let radiobox = document.createElement('input');

        radiobox.type = 'radio';
        radiobox.name = 'question' + question.question_id
        radiobox.id = option;
        radiobox.value = option_text;

        let label = document.createElement('label')
        label.htmlFor = option;
        label.id = 'label_' + option
        console.log(label)


        let description = document.createTextNode(option_text);
        label.appendChild(description);

        let newline = document.createElement('br');

        optionContainer.append(radiobox);
        optionContainer.append(label);
        optionContainer.append(newline);
    }
}

function disableButtons() {
    let question_name = 'question' + question.question_id
    let radioboxes = $("input[name='" + question_name + "']");
    radioboxes.each(function (i) {
        $(this).attr('disabled', 'disabled');
    });
    $('#submit').attr('disabled', 'disabled');
}

function submitAnswer() {
    let radiobox_name = 'question' + question.question_id
    let chosen_id = $("input[name='" + radiobox_name + "']:checked")[0].id;
    let answer_id = question.answer_id
    formatAndGrading(chosen_id, answer_id)
    disableButtons()
    createNextButton()
    //  $.ajax({
    //     type: "POST",
    //     url: "check",
    //     dataType : "json",
    //     contentType: "application/json; charset=utf-8",
    //     data : JSON.stringify({"id": question.question_id,
    //                                  "answer"}),
    //     success: function(result){
    //         let featured = result["featured"]
    //         displayFeaturedList(featured)
    //         // console.log(data);
    //     },
    //     error: function(request, status, error){
    //         console.log("Error");
    //         console.log(request)
    //         console.log(status)
    //         console.log(error)
    //     }
    // });
}

function createNextButton() {
    $('<button/>',{
        id: 'next',
        text: 'Next',
        click: function () {
        console.log('Next clicked')
        if(question.next_id === "0"){
            window.location.href = "/quiz/2"
        }else{
            window.location.href ="/quiz/1/" + question.next_id
        }
    }
    }).appendTo('#quiz_container');

}

function formatAndGrading(chosen_id, answer_id) {
    let chosen_option = $('#label_' + chosen_id)
    let answer_option = $('#label_' + answer_id)
    if (chosen_id === answer_id) {
        answer_option.addClass('correct_option')
        score += 1
    } else {
        answer_option.addClass('correct_option')
        chosen_option.addClass('incorrect_option')
    }
    $('#level_1_score').text(score)
}


$(document).ready(function () {
    displayQuestion(question)
    $("#submit").click(function () {
        submitAnswer()
    })
    $("#next").click()
})