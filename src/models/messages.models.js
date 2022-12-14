const { DataTypes } = require('sequelize')
const db = require('../utils/database')

const Users = require('./users.models')
const Conversations = require('./conversations.models')

const Messages = db.define('messages', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Users
        }
    },
    conversationsId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Conversations
        }
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = Messages