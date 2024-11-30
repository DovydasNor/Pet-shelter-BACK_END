const { getDB } = require('../db')
const { ObjectId } = require('mongodb')

async function createPet(newPetData) {
    const db = getDB()

    const response = await db.collection('pets').insertOne(newPetData)

    return response
}

module.exports = { createPet }