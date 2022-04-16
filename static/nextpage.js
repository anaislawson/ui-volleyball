function view_teamlayout(){
  let url = "/teamlayout"
  window.location.href = url
  
}


$(document).ready(function(){                       

  //displayPopular(data)
  //$(".top3").hover(function(){ $(this).toggleClass('cn'); });
  $("#lesson").click(function(){
    view_teamlayout();         
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
