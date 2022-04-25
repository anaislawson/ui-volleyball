// // testing js dict 

// roles =['setter','libero','outside hitter','Outside hitter (left)','Opposite hitter','Middle blocker']       

// new_dict = {1:'1', 2:'2', 3:'3', 4:'4', 5:'5', 6:'6' }
// new_dict = {1:[], 2:[], 3:'3', 4:'4', 5:'5', 6:'6' }


// function display_roles(r){
//     $("#quiz_2_roles_first").empty();
    
//     $.each(roles, function(index,value){
//         // $.each(value, function(index,value){
//             let new_div_per_value = ('<div class="roles_div ui-widget-content" id="left_id_'+ index +'">'+value+'</div>');
//             $("#quiz_2_roles_first").append(new_div_per_value);
            
//             $(".ui-widget-content").draggable({
//                 revert: "invalid",

                
//             })
//         // })
//     })

//     console.log(roles)
//     $("#quiz_2_roles_first").prepend('<div class="title_roles ui-widget-header" id="titles_drags">ROLES</div>');

// }

// function display_role_destination(r){
   
//     $("#quiz_2_roles_second").empty();
//     console.log(new_dict)

//     $.each(new_dict, function(index,value){
//         // $.each(value, function(index,value){
            
//         // let id = this.id 
//             let empty_div_per_value = ('<div class="roles_div ui-widget-content dropdiv" id="right_id_'+ index +'">'+value+'</div>');
//             $("#quiz_2_roles_second").append(empty_div_per_value);


//              // droppable 

//             $("#quiz_2_roles_second").droppable({
//                 accept: ".roles_div",
//                 activeClass: "active",

//                 drop: function(event,ui){
//                     let divname = $(this).attr('id');

//                     console.log(divname);
//                     // console.log(id)
//                     let name_dropped = $(ui.draggable)[0].innerHTML
//                     console.log(name_dropped)
//                     $(roles.splice($.inArray(name_dropped, roles),1))

                    
//                     // new_dict[id.toString()]= name_dropped
                
                // drop: function(event,ui){
                //     let name_dropped = $(ui.draggable)[0].innerHTML
                //     console.log(name_dropped)
                //     $(roles.splice($.inArray(name_dropped, roles),1))
                //     // $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(index);
                    
                    
                //     // new_dict = name_dropped
                //     new_dict.splice(0, index) + name_dropped + new_dict.slice(index);
                    
//                     // new_dict.push(name_dropped)
                    
//                     console.log(new_dict)
//                     console.log(roles)
//                     display_role_destination(new_dict)

//                 }

//             })

//         })
//     // })
//         $("#quiz_2_roles_second").prepend('<div class="title_roles ui-widget-header" id="titles_drags">MATCH</div>');
//     // })


// }

var correctCards = 0;
$( init );

function init() {

  // Hide the success message
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );

  // Create the pile of shuffled cards
  var numbers = [ 1, 2, 3, 4, 5, 6];
  let players = ['setter','libero','outside hitter','Outside hitter (left)','Opposite hitter','Middle blocker']


  let roledict = {1:'setter', 2:'libero', 3:'outside hitter', 4:'Outside hitter (left)', 5:'Opposite hitter', 6:'Middle blocker'};

  for ( var key in roledict ) {
    $('<div>' + roledict[key] + '</div>').data( 'number', key ).attr( 'id', 'card'+key ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }

  // Create the card slots
  var words = [ 'one', 'two', 'three', 'four', 'five', 'six'];
  for ( var i=1; i<=6; i++ ) {
    $('<div>' + i + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }

}

function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var cardNumber = ui.draggable.data( 'number' );

  // If the card was dropped to the correct slot,
  // change the card colour, position it directly
  // on top of the slot, and prevent it being dragged
  // again

  if ( slotNumber == cardNumber ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
  } 
  
  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go

  if ( correctCards == 6 ) {
    $("#submit").click(function () {
        
        get_and_view_quiz3("1")
        
    })
    // $('#successMessage').show();
    // $('#successMessage').animate( {
    //   left: '380px',
    //   top: '200px',
    //   width: '400px',
    //   height: '100px',
    //   opacity: 1
    // } );
  }

}

function get_and_view_quiz3(idval){
    let url = "/quiz/3/"+idval;
    window.location.href = url
    //go to quiz 2
    
}
$(document).ready(function() {

    init()


})
