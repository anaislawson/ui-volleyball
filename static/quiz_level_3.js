// testing js dict 

var roles =[       
    {
        '1': 'Setter',
        '2': 'Libero',
        '3': 'Outside hitter',
        '4': 'Opposite hitter',
        '5': 'Middle blocker'
    }
]       

var ans = []
function display_roles(roles){
    $("#roles").html("");
    console.log(roles)
    $.each(roles, function(index,value){
        $.each(value, function(index,value){
            let newRole = ('<div class="role row drag_box options_box">'+value+'</div>');
            $("#roles").append(newRole);
            $(".ui-widget-content").draggable({
                revert: "invalid",
            });
        });
    });

    newName = "";
    $(".role").addClass("draggable");
}

$(document).ready(function() {

    display_roles(roles)
    $(".role").draggable({ cursor: "crosshair", revert: "invalid", helper: "clone", stack: ".name"});

     // droppable 

})
