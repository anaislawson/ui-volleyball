
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
    updateScore(correctCards)
  } 
  
  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go

  if ( correctCards == 6 ) {
    // let ttlscore = 6
    // ttlscore+=totalquizscore
    // updateScore(ttlscore)
    display_btn()
    
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

function updateScore(score) {
    console.log(score)
    let scoreContainer = $('#level_2_score_div');
    scoreContainer.text('Score: ' + score + '/ 6')
}

function get_and_view_quiz3(idval){
    let url = "/quiz/3/"+idval;
    window.location.href = url
    //go to quiz 2
    
}


function display_btn(){
    $(".newbtn").empty()
    let btn = "<button id='submit' class='quiz_button_2'> Level 3➜ </button>"
    $(".newbtn").append(btn)
    $("#submit").click(function () {
        get_and_view_quiz3("1")      
    })
  }

$(document).ready(function() {

    init()


})