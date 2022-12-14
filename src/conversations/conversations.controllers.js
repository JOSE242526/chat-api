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

const createConversation = async (obj) => {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        imageUrl: obj.imageUrl,
        userId: obj.userId,
    })
    const participant1 = await Participants.create({
        id: uuid.v4(),
        userId: obj.userId,
        conversationsId: newConversation
    })
    const participant2 = await Participants.create({
        id: uuid.v4(),
        userId: obj.participantId,
        conversationsId: newConversation
    })

    return {
        newConversation,
        participant1,
        participant2
    }
}

module.exports = {
    createConversation,
    findAllConversations
}