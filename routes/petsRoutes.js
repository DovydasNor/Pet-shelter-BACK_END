const express = require('express')

const petsServices = require('../services/petsServices')

const router = express.Router()

router.put('/pets/:id', async (req, res) => {
    const { id } = req.params
    const updatedPetData = req.body

    try {
        const resData = await petsServices.editPet(id, updatedPetData)
        return res.send(resData)
    } catch (error) {
        return res.status(500).send({ error })
    }
})

router.get('/pets/:id', async (req, res) => {
    try {
        const { id } = req.params
        const petData = await petsServices.getSinglePet(id)
        res.send(petData)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
})


router.post('/pets', async (req, res) => {
    const newPetData = req.body

    try {
        const resData = await petsServices.createPet(newPetData)
        return res.send(resData)
    } catch (error) {
        return res.status(500).send({ error })
    }
})

router.get('/pets', async (req, res) => {
    try {
        const resData = await petsServices.getAllPets()
        return res.send(resData)
    } catch (error) {
        return res.status(500).send({ error })
    }
})

module.exports = router