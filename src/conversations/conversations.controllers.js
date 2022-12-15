const uuid = require('uuid')
const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')

const findAllConversations = async () => {
    const data = await Conversations.findAll({
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })
    return data
}

const findConversationById = async (id) => {
    const data = await Conversations.findOne({
        where: {
            id: id
        },
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })
    return data
}


const createConversation = async (obj) => {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        imgUrl: obj.imgUrl,
        userId: obj.ownerId 
    })
    const participant1 = await Participants.create({
        id: uuid.v4(),
        userId: obj.ownerId, 
        conversationId: newConversation.id
    })
    const participant2 = await Participants.create({
        id: uuid.v4(),
        userId: obj.participantId,
        conversationId: newConversation.id
    })
    return {
        newConversation,
        participant1,
        participant2
    }
}

const updateConversation = async(id, obj) => {
    const data = await Conversations.update(obj, {
        where: {
            id: id
        }
    })
    return data[0]
}

const deleteConversation = async (id) => {
    const data = await Conversations.destroy({
        where: {
            id: id
        }
    })
    return data
}
const removeConversation = async (id) => {
    const data = await Conversations.destroy({
        where: {
            id: id
        }
    })
    return data
}


createConversation({
title: 'Conversacion Sahid - Evertz',//? Titulo del chat
ownerId: 'be2ec1d7-7093-4820-9af9-2c375641591a', //? Evertz como owner
participantId: 'cefe466c-f849-4533-9662-32db3d5d2a81' //? Sahid como invitado
})
.then(data => console.log(data))
.catch(err => console.log(err))

module.exports = {
    createConversation,
    findAllConversations,
    findConversationById,
    updateConversation,
    deleteConversation,
    removeConversation
}