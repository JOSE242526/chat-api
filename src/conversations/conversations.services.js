const conversationController = require('./conversations.controllers')

const getAllConversations = (req, res) => {
    conversationController.findAllConversations()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const getConversationById = (req, res) =>{
    const id = req.params.id
    conversationController.findConversationById(id)
        .then(data =>{
            if(data){
                res.status(200).json(data)
            }else {
                res.status(404).json({message: 'Invalid Id'})
            }
        })
        .catch(err =>{
            res.status(400).json({message: err.message})
        })
}

const postConversation = (req, res) => {
    const {title, imageUrl, participantId} = req.body
    const ownerId = req.user.id 
    conversationController.createConversation({title, imageUrl, participantId, ownerId})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message, fields: {
                title: 'string',
                imageUrl: 'string',
                participantId: 'UUID'
            }})
        })
}

const patchConversation = (req, res) =>{
    const id = req.params.conversation_id
    const { title, imageUrl } = req.body
    conversationController.updateConversation(id, { title, imageUrl })
        .then(data =>{
            if(data){
                res.status(200).json({message: `Conversation with id: ${id} update succesfully`})
            }else{
                res.status(404).json({message: 'Invalid Id'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const deleteConversation = (req, res) =>{
    const id = req.params.conversation_id
    conversationController.deleteConversation(id)
    .then(data =>{
        if(data){
            res.status(200).json()
        }else{
            res.status(404).json({message: 'Invalid Id'})
        }
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    getAllConversations,
    postConversation,
    getConversationById,
    patchConversation,
    deleteConversation
}