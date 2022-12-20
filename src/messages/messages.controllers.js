const Messages = require('../models/messages.models')
const uuid = require('uuid')

const createMessage = async (obj) =>{
    const data = await Messages.create({
        id: uuid.v4(),
        userId: obj.userId,
        conversationId: obj.conversationId,
        message: obj.message
        
    })
    return data
}
const findMesssageById = async (messageId) => {
    const data = await Messages.findOne({
        where: {
            messageId: messageId 
        }
    })
    return data
}

const removeMessage = async (id, messageId) =>{
    const data = await Messages.destroy({
        where: {
            id: id,
            messageId: messageId 
        }  
    })
    return data
}

module.exports = {
    createMessage,
    findMesssageById,
    removeMessage
}