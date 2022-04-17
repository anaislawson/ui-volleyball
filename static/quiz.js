function displayQuestion(question) {
    console.log('Inside display_questions')

    let quizHeaderContainer = document.getElementById('level_1_question_header');
    let questionContainer = document.getElementById('level_1_question');
    let optionContainer = document.getElementById('level_1_options');

    quizHeaderContainer.append('Question ' + question.question_id)
    questionContainer.append(question.question)
    console.log(question.options)

    for (let option in question.options) {
        let option_text = question.options[option]
        let radiobox = document.createElement('input');

        radiobox.type = 'radio';
        radiobox.name = 'question' + question.question_id
        radiobox.id = option;
        radiobox.value = option_text;

        let label = document.createElement('label')
        label.htmlFor = option;

        let description = document.createTextNode(option_text);
        label.appendChild(description);

        let newline = document.createElement('br');

        optionContainer.appendChild(radiobox);
        optionContainer.appendChild(label);
        optionContainer.appendChild(newline);
    }
}


$(document).ready(function () {
    console.log('Inside doc.ready')
    displayQuestion(question)
})