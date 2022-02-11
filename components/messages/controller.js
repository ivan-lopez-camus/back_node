const store = require('./store');
const socket = require('../../socket').socket;

function addMensaje(chat, user, message,file){

    return new Promise((resolve, reject)=>{
        if(!user || !message ){
            console.error('[messageController] No hay usuario o mensaje');
            return reject('Datos incorrectos');
        }

        let fileUrl = '';
        if(file){
            fileUrl = 'http://localhost:3000/app/files/'+file.filename;
        }
        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl,
        };
    
        store.addMessage(fullMessage);

        socket.io.emit('message', fullMessage);

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

function getMessages(filterChat){
    return new Promise((resolve, reject)=>{
        resolve(store.listMessage(filterChat));
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