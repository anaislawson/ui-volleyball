// testing js dict 

function display_roles(r){
    $("#quiz_2_roles_first").empty();
    
    $.each(roles, function(index,value){
        let new_div_per_value = ('<div class="roles_div ui-widget-content">'+value+'</div>');
        $("#quiz_2_roles_first").append(new_div_per_value);
        $(".ui-widget-content").draggable({
            revert: "invalid",

        })
    })

    $("#quiz_2_roles_first").prepend('<div class="title_roles ui-widget-header" id="titles_drags">ROLES</div>');

}

function display_role_destination(r){
   
    $("#quiz_2_roles_second").empty();
    
    $.each(empty_dic, function(index,value){
        
        let empty_div_per_value = ('<div class="roles_div ui-widget-content">'+index+' '+value+'</div>');
        $("#quiz_2_roles_second").append(empty_div_per_value);
    })
    $("#quiz_2_roles_second").prepend('<div class="title_roles ui-widget-header" id="titles_drags">MATCH</div>');


}

$(document).ready(function() {

    display_roles(roles)
    display_role_destination(roles)

    
    $("#quiz_2_roles_second").droppable({
        accept: ".roles_div",
        activeClass: "active",

        drop: function(event,ui){
            $(this)
            .find("p")
            
            let name_dropped = $(ui.draggable)[0].innerHTML
            console.log(name_dropped)
            
        }

    })

})
