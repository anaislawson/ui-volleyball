// testing js dict 
var roles_labels =[]
var used = []
var ans = "default"

function display_roles(roles){
    $("#roles").html("");
    console.log(roles)
    $.each(roles, function(index,value){
        let newRole = ('<div class="role row drag_box options_box options_format" data-role=\"'+value+'\"data-ans='+(index+1)+'>'+ value + '</div>');
        $("#roles").append(newRole);
        $(".ui-widget-content").draggable({
            revert: "invalid",
        });
    });

    newName = "";
    $(".role").addClass("draggable");
}

function display_answer(){
    $.each(used, function(index, value){
        //make the draggable name object
        $("#submission").removeClass('submit_format')
        $("#submission").addClass('answer options_box')
        $("#submission").append(value);
    });
}
function display_correct_answer(ans){
    $("#roles").html("");
    $.each(roles, function(index,value){
        let newRole = ('<div class="role row drag_box options_box" data-role=\"'+value+'\"data-ans='+(index+1)+'>'+ value + '</div>');
        
        if(value === ans){
            newRole = ('<div class="role correct row drag_box options_box" data-role=\"'+value+'\"data-ans='+(index+1)+'>'+ value + '</div>');
        }
        
        $("#roles").append(newRole);
        $(".ui-widget-content").draggable({
            revert: "invalid",
        });
    });
    newName = "";
}
function submitAnswer(){
    $.ajax({
        type: "POST",
        url: "/submit_role",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({"question_id": question_id,
                                    "answer": ans}),
        success: function(result){
            let correct = result['correct']
            let correct_answer = result['answer']

            if(correct){
                $("#submission-results").append("Correct!")
                $(".answer").addClass("correct")
                $("#submission-buttons").html("")
                $('<button/>',{
                    id: 'next',
                    text: 'Next',
                    class:'btn next_btn answer_btn',
                    click: function () {
                        window.location.href ="/quiz/3/" + question.next_id
                }
                }).appendTo('#submission-buttons');
            } else {
                $("#submission-inc-results").append("Incorrect!")
                $(".answer").addClass("incorrect")
                $("#submission-buttons").html("")
                $('<button/>',{
                    id: 'retry',
                    text: 'Retry',
                    class:'btn submit_btn answer_btn',
                    click: function () {
                        window.location.href ="/quiz/3/" + question_id
                }
                }).appendTo('#submission-buttons');
            }

        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

$(document).ready(function() {
    $.each(roles, function(index,value){
        roles_labels.push(value)
    });

    display_roles(roles_labels)
    $(".role").draggable({ revert: true, cursor: 'move', stack: ".options_box"});
    $(".submit_box").addClass("droppable");

    $(".submit_box").droppable({ accept: ".role",
    drop: function(event, ui){
        
        //get dropped name
        let role_name = $(ui.draggable).data("role");

        roles_labels.splice($.inArray(role_name, roles_labels), 1);

        ans = role_name
        
        //update used array to display ans
        used.push(role_name);
        console.log(roles)
        $("#submission").html("");
        // $("#submission").append("Your Answer:");
       
        let button = document.querySelector("#submit");
        button.disabled = false;
        
        //update the interface
        display_roles(roles_labels);
        display_answer();
    },
    over: function(event,ui){
        if($(this).has('.draggable').length) {
            $(this).droppable('disable');
        }
    }
});
    $("#submit").click(function () {
        submitAnswer()
    });

})
