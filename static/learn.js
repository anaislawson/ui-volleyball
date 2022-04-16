function displayInfo(lesson){
    $("#info").empty()
    let row = $("<div class='row'>")
    $('#info').append(row)
    let showinfo = $("<div style ='padding: 0px 20px 0px 0px;' class='col-md-4 col-sm-12'>")
    $(row).append(showinfo)
    let title = "<div class='title'>"+lesson["title"]+"</div>"
    $(showinfo).append(title)
    let textinfo = "<div class='textinfo'>"+lesson["title"]+"</div>"
    $(showinfo).append(textinfo)
    let demands = "<div class='demands'>"+lesson["title"]+"</div>"
    $(showinfo).append(demands)
    let image = "<div style='padding: 0px;'><img src='"+lesson["image"]+"' alt='picture of volleyball lesson' width=250px>"
    $(showinfo).append(image)
    let gif = "<div style='padding: 0px;'><img src='"+lesson["gif"]+"' alt='picture of volleyball gif' width=250px>"
    $(showinfo).append(gif)
    if(lesson["next_lesson"]!= "end"){
        let btn =  "<button type='button' id='learn'>Learn Strategy '"+lesson["next_lesson"]+"'/5 ➜</button> "
        $(".strategy_button_row").append(btn)
    }
    else{
        let btn =  "<button type='button' id='gotoquiz'>Challenge yourself➜</button> "
        $(".strategy_button_row").append(btn)
    }
    
    
}

function get_and_view_lesson(idval){
    let url = "/learn/"+idval
    window.location.href = url
    
}

function get_and_view_quiz(idval){
    let url = "/quiz/"+idval
    window.location.href = url
    
}

$(document).ready(function(){
    displayInfo(lesson)

    $("#learn").click(function(){
        let idval = $(this).attr('next_lesson');
        get_and_view_lesson(idval)           
    })

    $("#gotoquiz").click(function(){       
        get_and_view_quiz(idval)           
    })
    

  
})