
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
  let roledict = {1:'Setter', 2:'Libero', 3:'Outside hitter', 4:'Outside hitter (left)', 5:'Opposite hitter(right)', 6:'Middle blocker'};
  let numbers = [ 1, 2, 3, 4, 5, 6 ]
  numbers.sort( function() { return Math.random() - .5 } );
  console.log(numbers)
  for ( var i=0; i<6; i++ ) {
    $('<div class="quizcard">' + roledict[numbers[i]] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
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
    increaseScore() //increase global score
    updateScore(correctCards) //increase local score
  }
  
  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go

  if ( correctCards == 6 ) {
  
    display_btn()
    
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
    //go to quiz 3
    
}

function get_and_view_intertitle2(){
    let url = "/quiz2_intertitle"
    window.location.href = url
    //go to quiz 2 intertitle
    
}
function getScore() {
    console.log('Inside getScore')
    $.ajax({
        type: "GET",
        url: "/get_score/2",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        success: function(result){
            let score = result['score']
            updateScore(score)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function increaseScore() {
    console.log('Inside getScore')
    $.ajax({
        type: "GET",
        url: "/increase_score/2",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        success: function(result){
            let score = result['score']
            //updateScore(score)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}


function display_btn(){
    $(".newbtn").empty()
    let btn = "<button id='results' class='quiz_buttons'> Next </button>"
    $(".newbtn").append(btn)
    $("#results").click(function () {
        get_and_view_intertitle2()      
    })
  }

$(document).ready(function() {
    init()
    $("#quiz2_intertile_button_2").click(function () {
        get_and_view_quiz3("1")      
    })
})