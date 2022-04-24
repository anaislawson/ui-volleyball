// testing js dict 

roles =[       
    {
        '1': 'Setter',
        '2': 'Libero',
        '3': 'Outside hitter',
        '4': 'Outside hitter (left)',
        '5': 'Opposite hitter',
        '6': 'Middle blocker'
    }
]       

empty_dic =
[
    {
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': ''
    }
]


function display_roles(r){
    $("#quiz_2_roles_first").empty();
    
    $.each(roles, function(index,value){
        $.each(value, function(index,value){
            let new_div_per_value = ('<div class="roles_div ui-widget-content">'+value+'</div>');
            $("#quiz_2_roles_first").append(new_div_per_value);
            $(".ui-widget-content").draggable({
                revert: "invalid",

            })
        })
    })

    console.log(roles)
    $("#quiz_2_roles_first").prepend('<div class="title_roles ui-widget-header" id="titles_drags">ROLES</div>');

}

function display_role_destination(r){
   
    $("#quiz_2_roles_second").empty();
    
    $.each(empty_dic, function(index,value){
        $.each(value, function(index,value){
            
            let empty_div_per_value = ('<div class="roles_div ui-widget-content">'+index+'</div>');
            $("#quiz_2_roles_second").append(empty_div_per_value);

        })
        $("#quiz_2_roles_second").prepend('<div class="title_roles ui-widget-header" id="titles_drags">MATCH</div>');
    })


}

$(document).ready(function() {

    display_roles(roles)
    display_role_destination(roles)

     // droppable 
     $("#quiz_2_roles_second").droppable({
        accept: ".roles_div",
        activeClass: "active",

        drop: function(event,ui){
            $(this)
            // .find("p")
            
            let name_dropped = $(ui.draggable)[0].innerHTML
            console.log(name_dropped)
            // $.each(empty_dic, function(index,value){
            //     $.each(value, function(index,value){
                    $(empty_dic.splice($.inArray(index,1,value)))
                    
            //     })
            // })
            // empty_dic.push(name_dropped);
            console.log(empty_dic)
            // console.log(empty_dic)
            // $(roles.splice($.inArray(name_dropped, roles),1))
            
            // display_roles(roles)
            // display_role_destination(roles)
            
        }

    })

})
