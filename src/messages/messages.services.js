const messagesControllers = require('./messages.controllers')

const postMessage = (req, res) =>{
    const userId = req.use.id
    const conversationId = req.params.conversation_id
    const {message} = req.body
    messagesControllers.createMessage({userId, conversationId, message})
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err =>{
            res.status(400).json({
                message: err.message,
                fields: {
                    message: 'text'
                }
            })
        })
}

const getMessageById = (req, res) =>{
    const id = req.user.id
    const messageId = req.body.messageId
    messagesControllers.findPostsById(id, messageId)
    .then((data) => {
        if(data){
            res.status(200).json(data)
        } else {
            res.status(404).json({message: 'Invalid ID: ' +id})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const deleteMessage = async (id, messageId) => {
    const data = await messagesControllers.removeMessage({
        where: {
            id: id,
            messageId: messageId
        }
    })
    return data[0]
}

module.exports = {
    postMessage,
    getMessageById,
    deleteMessage
}