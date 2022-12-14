const Users = require('./users.models')
const RecoveryPasswords = require('./recoveryPasswords.models')
const Conversations = require('./conversations.models')
const Messages = require('./messages.models')
const Participants = require('./participants.models')

const initModels = () => {
    //? FK = RecoveryPasswords
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)
    //? user - message
    Messages.belongsTo(Users)
    Users.hasMany(Messages)
    //? user - conversation
    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)
    //? user - conversation
    Users.hasMany(Participants)
    Participants.belongsTo(Users)
    //? conversation - message
    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)
    //? conversation - paticipants
    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)
}

module.exports = initModels