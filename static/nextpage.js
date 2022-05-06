function view_team_layout(){
  let url = "/team_layout"
  window.location.href = url
  
}
function view_gameplay(){
    let url = "/gameplay"
    window.location.href = url
    
}

function view_learn(idval){
    let url = "/learn/"+idval+"/1"
    window.location.href = url
    
  }
$(document).ready(function(){

    $("#home").click(function(){
        window.location.href = "/";
    })

  $("#team_layout").click(function(){
    view_team_layout();         
  })
  $("#see_it_in_action").click(function(){
    view_gameplay();         
  })
  $("#learn1").click(function(){
    view_learn("1");                                    
  })
})
