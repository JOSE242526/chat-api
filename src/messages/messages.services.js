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

module.exports = {
    postMessage
}