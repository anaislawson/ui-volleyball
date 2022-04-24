
function display_roles(r){
    $("#quiz_2_roles_first").empty();
    $.each(roles, function(index,value){
        let new_div_per_value = ('<div class="roles_div ui-widget-content">'+value+'</div>');
        $("#quiz_2_roles_first").append(new_div_per_value);
    })

}

$(document).ready(function() {
    
    
    display_roles(roles)


})
