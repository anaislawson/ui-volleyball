// testing js dict 

var roles =[       
    {
        '1': 'Setter',
        '2': 'Libero',
        '3': 'Outside hitter',
        '4': 'Outside hitter (left)',
        '5': 'Opposite hitter',
        '6': 'Middle blocker'
    }
]       

var ans = []
function display_roles(r){
    $("#roles").html("");
    
    $.each(roles, function(index,value){
        $.each(value, function(index,value){
            let newRole = ('<div class="role row color-test">'+value+'</div>');
            $("#roles").append(newRole);
            $(".ui-widget-content").draggable({
                revert: "invalid",

            })
        });
    });

    newName = "";
    $(".role").addClass("draggable");
    $(".role").draggable({ cursor: "crosshair", revert: "invalid", helper: "clone", stack: ".name"});

}

$(document).ready(function() {

    display_roles(roles)

     // droppable 

})
