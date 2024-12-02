const express = require('express')

const volunteersServices = require('../services/volunteersServices')

const router = express.Router()

router.delete('/volunteers/:id', async (req, res) => {
    const { id } = req.params

    try {
        const resData = await volunteersServices.deleteVolunteer(id)
        return res.send(resData)
    } catch (error) {
        return res.status(500).send({ error })
    }
})

router.put('/volunteers/:id', async (req, res) => {
    const { id } = req.params
    const updatedVolunteerData = req.body

    try {
        const resData = await volunteersServices.editVolunteer(id, updatedVolunteerData)
        return res.send(resData)
    } catch (error) {
        return res.status(500).send({ error })
    }
})

router.get('/volunteers/:id', async (req, res) => {
    try {
        const { id } = req.params
        const volunteerData = await volunteersServices.getSingleVolunteer(id)
        res.send(volunteerData)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.post('/volunteers', async (req, res) => {
    const newVolunteerData = req.body

    try {
        const resData = await volunteersServices.createVolunteer(newVolunteerData)
        return res.send(resData)
    } catch (error) {
        return res.status(500).send({ error })
    }
})

router.get('/volunteers', async (req, res) => {
    try {
        const resData = await volunteersServices.getAllVolunteers()
        return res.send(resData)
    } catch (error) {
        return res.status(500).send({ error })
    }
})

module.exports = router