const express = require('express')
const commentsServices = require('../services/commentsServices')
const router = express.Router()

router.post('/pets/:id/comments', async (req, res) => {
    const { id } = req.params
    const { comment, volunteerId } = req.body

    try {
        const resData = await commentsServices.addComment(id, comment, volunteerId)
        return res.send(resData)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})

router.delete('/comments/:id', async (req, res) => {
    const { id } = req.params
  
    try {
      const success = await commentsServices.deleteComment(id)
      if (success) {
        return res.sendStatus(204)
      } else {
        return res.status(404).send({ error: 'Comment not found' })
      }
    } catch (error) {
      return res.status(500).send({ error: error.message })
    }
  })

router.get('/pets/:id/comments', async (req, res) => {
    const { id } = req.params

    try {
        const comments = await commentsServices.getComments(id)
        return res.send(comments)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})

module.exports = router