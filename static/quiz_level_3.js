// testing js dict 
var roles_labels =[]
var used = []
var ans = "default"

function display_roles(roles){
    $("#roles").html("");
    console.log(roles)
    $.each(roles, function(index,value){
        let newRole = ('<div class="role row drag_box options_box" data-role=\"'+value+'\"data-ans='+(index+1)+'>'+ value + '</div>');
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
        newName = $("<div class='role row answer options_box' id = 'answer' data-role=" + value + ">").text(value);
        $("#submission").append(newName);
    });
}
function display_correct_answer(ans){
    $("#roles").html("");
    $.each(roles, function(index,value){
        let newRole = ('<div class="role row drag_box options_box" data-role=\"'+value+'\"data-ans='+(index+1)+'>'+ value + '</div>');
        
        if(value == ans){
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
            } else {
                display_correct_answer(correct_answer)
                $("#submission-inc-results").append("Incorrect!")
                $(".answer").addClass("incorrect")
            }

            let button = document.querySelector("#submit");
            button.disabled = true;

            $("#submission-buttons").html("")
            $('<button/>',{
                id: 'next',
                text: 'Next',
                class:'quiz_buttons',
                click: function () {
                    window.location.href ="/quiz/3/" + question.next_id
            }
            }).appendTo('#submission-buttons');

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
    $(".role").draggable({ cursor: "crosshair", revert: "invalid", helper: "clone", stack: ".name"});
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
        $("#submission").append("Your Answer:");
       
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
