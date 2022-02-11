
const Model = require('./model')

function addMessage(message){
    //list.push(message);
    const myMessage = new Model(message)
    myMessage.save();
}

async function listMessage(filterUser){
    
    let filter = {};
    if(filterUser !== null){
        filter = {user: filterUser};
    }
    const messages = await Model.find(filter);
    return messages;
}

async function updateText(id, message){
    
    const foundMessage = await Model.findOne({
        _id : id
    });
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

async function existDB(id) {
    const exist = await Model.exists({
        _id: id
    });
    return exist;
}

async function removeMessage(id) {
    if (await existDB(id)) {
        return await Model.findOneAndDelete({
            _id: id
        })
    }
    return false;
}

module.exports = {
    addMessage,
    listMessage,
    updateText,
    removeMessage
    
}