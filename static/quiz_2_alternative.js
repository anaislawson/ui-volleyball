$(document).ready(function() {
    $( function() {
            let sortable_list = $('#sortable');

            sortable_list.sortable({
                connectWith: ("#shopping-quiz_2_roles_second")
            })
            
            let order = $( "#sortable" ).sortable( "toArray" );
            console.log(order);
            
    });

    $(".quiz_button_2").click({

       
    })





})