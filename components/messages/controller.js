const store = require('./store');

function addMensaje(user, message){

    return new Promise((resolve, reject)=>{
        if(!user || !message ){
            console.error('[messageController] No hay usuario o mensaje');
            return reject('Datos incorrectos');
        }
        const fullMessage = {
            user: user,
            message: message,
            date: new Date()
        };
    
        store.addMessage(fullMessage);
        resolve(fullMessage);
    })
}

function updateMessage(id,message){
    // console.log(id);
    // console.log(message);
    return new Promise(async (resolve, reject)=>{
        if(!id  || !message){
            reject('Invalid data');
            return false;
        }
        const result = await store.updateText(id,message);
        resolve(result);
    });
}

function getMessages(filterUser){
    return new Promise((resolve, reject)=>{
        resolve(store.listMessage(filterUser));
    });
}

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        if(!id) {
            reject('Invalid data');
            returnfalse;
        }
        store.removeMessage(id)
        .then((data) => {
            if (!data) {
                reject('Message not found')
            }
            resolve();
        })
        .catch((e) => {
            reject(e);
        });
    });
}

module.exports= {
    addMensaje,
    getMessages,
    updateMessage,
    deleteMessage
}