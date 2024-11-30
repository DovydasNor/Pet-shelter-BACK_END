const express = require('express')

const petsServices = require('../services/petsServices')

const router = express.Router()


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