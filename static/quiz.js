function displayQuestion(question) {

    let quizHeaderContainer = $('#level_1_question_header');
    let questionContainer = $('#level_1_question');
    let optionContainer = $('#level_1_options');

    quizHeaderContainer.append('Question ' + question.question_id)
    questionContainer.append(question.question)
    getScore()

    for (let option in question.options) {
        let option_text = question.options[option]
        let radiobox = document.createElement('input');

        radiobox.type = 'radio';
        radiobox.name = 'question' + question.question_id
        radiobox.id = option;
        radiobox.class = 'quiz_level_1_radioboxes'
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
    radioboxes.each(function () {
        $(this).attr('disabled', 'disabled');
    });
    $('#submit_1').attr('disabled', 'disabled');
}

function submitAnswer() {
    let radiobox_name = 'question' + question.question_id
    let chosen_id = $("input[name='" + radiobox_name + "']:checked")[0].id;
    let answer_id = question.answer_id
    formatAndGrading(chosen_id, answer_id)
    disableButtons()
    createNextButton()
}

function updateScore(score) {
    console.log(score)
    let scoreContainer = $('#level_1_score');
    scoreContainer.text(score + '/5')
}

function updateResponse(question_id, option_id) {
    console.log('Inside updateResponses')
    $.ajax({
        type: "POST",
        url: "/update_response",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({"question_id": question_id,
                                     "option_id": option_id}),
        success: function(result){
            let responses = result['responses']
            console.log(responses)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function getScore() {
    console.log('Inside getScore')
    $.ajax({
        type: "GET",
        url: "/get_score/1",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        success: function(result){
            let score = result['score']
            updateScore(score)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function increaseScore() {
    console.log('Inside getScore')
    $.ajax({
        type: "GET",
        url: "/increase_score/1",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        success: function(result){
            let score = result['score']
            updateScore(score)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function createNextButton() {
    $('<button/>',{
        id: 'next',
        text: 'Next',
        class:'quiz_button_1_next',
        click: function () {
            console.log('Next clicked');
            window.location.href ="/quiz/1/" + question.next_id
    }
    }).appendTo('.quiz_1_next_button');

}

function formatAndGrading(chosen_id, answer_id) {
    console.log('Chosen : ' + chosen_id)
    console.log('Correct : ' + answer_id)
    let chosen_option = $('#label_' + chosen_id)
    let answer_option = $('#label_' + answer_id)
    if (chosen_id === answer_id) {
        answer_option.addClass('correct_option')
        increaseScore()
    } else
    {
        answer_option.addClass('correct_option')
        chosen_option.addClass('incorrect_option')
    }
    updateResponse(question.question_id, chosen_id)
}

function get_and_view_quiz2(idval){
    let url = "/quiz/2/"+idval;
    window.location.href = url
    //go to quiz 2
    
}


$(document).ready(function () {
    if(question_id != "end"){
        displayQuestion(question)
    }
    
    $("#submit_1").click(function () {
        submitAnswer()
    })
    $("#quiz_intertile_button_2").click(function () {
        get_and_view_quiz2("1")
    })
    
})