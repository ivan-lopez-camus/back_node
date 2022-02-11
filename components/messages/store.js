const list = [];

function addMessage(message){
    list.push(message);
}

function listMessage(){
    return list;
}

module.exports = {
    add: addMessage,
    list: listMessage,
    //get
    //update
    //delete
}