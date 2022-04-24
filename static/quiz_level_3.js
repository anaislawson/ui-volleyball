// testing js dict 

var roles =[
     "Setter",
     "Libero",
     "Outside hitter",
     "Opposite hitter",
     "Middle blocker"
]       

var used = []
function display_roles(roles){
    $("#roles").html("");
    console.log(roles)
    $.each(roles, function(index,value){
        let newRole = ('<div class="role row drag_box options_box" data-role='+value+'>'+ value + '</div>');
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

$(document).ready(function() {

    display_roles(roles)
    $(".role").draggable({ cursor: "crosshair", revert: "invalid", helper: "clone", stack: ".name"});
    $(".submit_box").addClass("droppable");

    $(".submit_box").droppable({ accept: ".role",
    drop: function(event, ui){
        
        //get dropped name
        let role_name = $(ui.draggable).data("role");
        let index = roles.indexOf(role_name);
        //update names array

        roles.splice($.inArray(role_name, roles), 1);

        //update list1 array
        used.push(role_name);
        console.log(roles)
        $("#submission").html("");
        $("#submission").append("Your Answer:");
        
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

     // droppable 

})
