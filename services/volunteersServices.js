const { getDB } = require('../db')
const { ObjectId } = require('mongodb')

async function editVolunteer(id, updatedVolunteerData) {
    const db = getDB()

    const response = await db.collection('volunteers').updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: updatedVolunteerData })

    return response
}

async function deleteVolunteer(id) {
    const db = getDB()

    const response = await db.collection('volunteers').deleteOne({ _id: ObjectId.createFromHexString(id) })

    return response
}

async function getSingleVolunteer(id) {
    const db = getDB()

    const response = await db.collection('volunteers').find({ _id: ObjectId.createFromHexString(id) }).next()

    return response
}

async function createVolunteer(newVolunteerData) {
    const db = getDB()

    const response = await db.collection('volunteers').insertOne(newVolunteerData)

    return response
}

async function getAllVolunteers() {
    const db = getDB()

    const response = await db.collection('volunteers').find({}).toArray()

    return response
}

module.exports = { createVolunteer, getAllVolunteers, getSingleVolunteer, editVolunteer, deleteVolunteer }