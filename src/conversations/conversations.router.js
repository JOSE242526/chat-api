const router = require('express').Router()
const conversationServices = require('./conversations.services')
const passportJWT = require('../middlewares/auth.middleware')
const messageService = require('../messages/messages.services')
const participantValidate = require('../middlewares/participantsValidate.middlewares')

router.route('/')
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getAllConversations)
    .post(passportJWT.authenticate('jwt', {session: false}), conversationServices.postConversation)

router.route('/:conversation_id')
        .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getConversationById)
        .patch(passportJWT.authenticate('jwt', {session: false}), conversationServices.patchConversation)
        .delete(passportJWT.authenticate('jwt', {session: false}), conversationServices.deleteConversation)

router.route('/:conversation_id/messages')
        .post(passportJWT.authenticate('jwt', {session: false}), participantValidate, messageService.postMessage)


module.exports = router
