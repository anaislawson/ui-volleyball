// testing js dict 

var roles =[
     "Outside Hitter",
     "Middle Blocker",
     "Libero",
     "Setter",
     "Opposite Hitter"
]       

var used = []
var ans = 0

function display_roles(roles){
    $("#roles").html("");
    console.log(roles)
    $.each(roles, function(index,value){
        let newRole = ('<div class="role row drag_box options_box" data-role='+value+' data-ans='+(index+1)+'>'+ value + '</div>');
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
        newName = $("<div class='role row options_box' data-role=" + value + ">").text(value);
        $("#submission").append(newName);
    });
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
            if(correct){
                $("#submission-results").append("Correct")
            } else {
                $("#submission-results").append("Incorrect")
            }

            let button = document.querySelector("#submit");
            button.disabled = true;

            $("#submission-buttons").html("")
            $('<button/>',{
                id: 'next',
                text: 'Next',
                class:'quiz_buttons quiz_button_2',
                click: function () {
                    console.log('Next clicked');
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

    display_roles(roles)
    $(".role").draggable({ cursor: "crosshair", revert: "invalid", helper: "clone", stack: ".name"});
    $(".submit_box").addClass("droppable");

    $(".submit_box").droppable({ accept: ".role",
    drop: function(event, ui){
        
        //get dropped name
        let role_name = $(ui.draggable).data("role");
        ans = $(ui.draggable).data("ans");
        
        //update roles array
        roles.splice($.inArray(role_name, roles), 1);

        //update used array to display ans
        used.push(role_name);
        console.log(roles)
        $("#submission").html("");
        $("#submission").append("Your Answer:");
       
        let button = document.querySelector("#submit");
        button.disabled = false;
        
        //update the interface
        display_roles(roles);
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
