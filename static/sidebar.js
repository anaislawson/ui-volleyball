
function fillSidebar() {
    let sidebar =  $('#sidebar_list')
    for (let content of Object.entries(contents)) {
        let list_item = $('<li><a href='+ content[1].url +
            '>' + content[1].long_title + '</a></li>')
        sidebar.append(list_item)
    }
}

$(document).ready(function(){
    fillSidebar()
})