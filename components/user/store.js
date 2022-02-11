const Model = require('./model');

function addUser(user){
    const myUser = new Model(user)
    return myUser.save();
}

async function listUser(filterName){
    
    let filter = {};
    if(filterName !== null){
        filter = {name: filterName};
    }
    const messages = await Model.find(filter);
    return messages;
}


module.exports={
    addUser,
    listUser
}