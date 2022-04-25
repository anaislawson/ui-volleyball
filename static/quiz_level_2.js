// testing js dict 

roles =['setter','libero','outside hitter','Outside hitter (left)','Opposite hitter','Middle blocker']       

new_dict = {1:[], 2:[], 3:'3', 4:'4', 5:'5', 6:'6' }

function display_roles(r){
    $("#quiz_2_roles_first").empty();
    
    $.each(roles, function(index,value){
        // $.each(value, function(index,value){
            let new_div_per_value = ('<div class="roles_div ui-widget-content" id="left_id_'+ index +'">'+value+'</div>');
            $("#quiz_2_roles_first").append(new_div_per_value);
            
            $(".ui-widget-content").draggable({
                revert: "invalid",

                
            })
        // })
    })

    console.log(roles)
    $("#quiz_2_roles_first").prepend('<div class="title_roles ui-widget-header" id="titles_drags">ROLES</div>');

}

function display_role_destination(r){
   
    $("#quiz_2_roles_second").empty();
    console.log(new_dict)

    $.each(new_dict, function(index,value){
        // $.each(value, function(index,value){
            
        // let id = this.id 
            let empty_div_per_value = ('<div class="roles_div ui-widget-content" id="right_id_'+ index +'">'+value+'</div>');
            $("#quiz_2_roles_second").append(empty_div_per_value);


             // droppable 

            $("#quiz_2_roles_second").droppable({
                accept: ".roles_div",
                activeClass: "active",

                drop: function(event,ui){
                    let name_dropped = $(ui.draggable)[0].innerHTML
                    console.log(name_dropped)
                    $(roles.splice($.inArray(name_dropped, roles),1))
                    // $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(index);
                    
                    
                    // new_dict = name_dropped
                    new_dict.splice(0, index) + name_dropped + new_dict.slice(index);
                    
                    // new_dict.push(name_dropped)
                    
                    console.log(new_dict)
                    console.log(roles)
                    display_role_destination(new_dict)

                }

            })

        })
    // })
        $("#quiz_2_roles_second").prepend('<div class="title_roles ui-widget-header" id="titles_drags">MATCH</div>');
    // })


}

$(document).ready(function() {

    display_roles(roles)
    display_role_destination(roles)


})
