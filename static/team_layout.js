$(document).ready(function(){

    $("#goback").click(function(){
        parent.history.back();
        return false;
    })

})