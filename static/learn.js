function displayInfo(lesson){
    $("#header").empty()
    $("#info").empty()

    let headerrow = $("<div class='row learn_first_row'>")
    $('#header').append(headerrow)
    let backbtninfo = $("<div class='col-md-2 col-sm-12' id='back_button_for_learn'>")
    $(headerrow).append(backbtninfo)
    let backbtn =  "<button type='button' id='back'>←</button> "
    $(backbtninfo).append(backbtn)
    let headerinfo = $("<div class='col-md-8 col-sm-12' id='titles_div'>")
    $(headerrow).append(headerinfo)
    let title = "<div class='title'>"+lesson["title"]+"</div>"
    $(headerinfo).append(title)
// first row
    let firstrow = $("<div class='row' id='first_row_learning'>")
    $('#info').append(firstrow)
    let explanation = $("<div class='col-md-5 col-sm-12'>")
    $(firstrow).append(explanation)
    let textinfo = "<div class='textinfo'>"+lesson["text"]+"</div>"
    $(explanation).append(textinfo)
    let summary = "<div class='summary'>"+lesson["summary"]+"</div>"
    $(explanation).append(summary)
    let image = "<div class='infograophicssize'><img src='"+lesson["image"]+"' alt='picture of volleyball lesson' class='pictureformat'>"
    let imagespace = $("<div class='col-md-5 col-sm-12'>")
    $(firstrow).append(imagespace)
    $(imagespace).append(image)
    // second row
    let secondrow = $("<div class='row'>")
    $('#info').append(secondrow)
    let demandsinfo = $("<div class='col-md-6 col-sm-12'>")
    $(secondrow).append(demandsinfo)
    $(demandsinfo).append("<div class='subhead'>Strategic Demands</div>")
    
    $.each(lesson["demands"], function(key,value){
        let demands = "<div class='demands'>"+value+"</div>"
        $(demandsinfo).append(demands)    
    }) 
    let gifspace = $("<div class='col-md-6 col-sm-12'>")
    $(secondrow).append(gifspace)
    let gif = "<div class='infograophicssize'><img src='"+lesson["gif"]+"' alt='picture of volleyball gif' class='pictureformat'>"
    $(gifspace).append(gif)

    //button
    if(lesson["next_lesson"]!= "end"){
        let btn =  "<button type='button' id='learn'>Learn Strategy "+lesson["next_lesson"]+"/5 ➜</button> "
        $(".strategy_button_row").append(btn)
    }
    else{
        let btn =  "<button type='button'  id='gotoquiz'>Challenge yourself➜</button> "
        $(".strategy_button_row").append(btn)
    }
    
    
}

function get_and_view_lesson(idval){
    let url = "/learn/"+idval
    window.location.href = url
    
}

function get_and_view_quiz(){
    let url = "/quiz";
    window.location.href = url
    
}


$(document).ready(function(){

    displayInfo(lesson)


    $("#learn").click(function(){
        
        get_and_view_lesson(lesson["next_lesson"])           
    })

    $("#gotoquiz").click(function(){       
        get_and_view_quiz()           
    })
    
    $("#back").click(function(){
        parent.history.back();
  		return false;
    })
   

  
})