function view_team_layout(){
  let url = "/team_layout"
  window.location.href = url
  
}
function view_inaction(){
    let url = "/inaction"
    window.location.href = url
    
}

function view_learn(idval){
    let url = "/learn/"+idval+"/1"
    window.location.href = url
    
  }
$(document).ready(function(){                       

  //displayPopular(data)
  //$(".top3").hover(function(){ $(this).toggleClass('cn'); });

    $("#home").click(function(){
        window.location.href = "/";
    })

  $("#vballinfo").click(function(){
    view_team_layout();         
  })
  $("#see_it_in_action").click(function(){
    view_inaction();         
  })
  $("#learn1").click(function(){
    view_learn("1");                                    
  })
//   $("#quiz").click(function(){
//     let idval = $(this).attr('id');
//     get_and_view_item(idval)           
//   })
//   $("#inaction").click(function(){
//     let idval = $(this).attr('id');
//     get_and_view_item(idval)           
//   })

})
