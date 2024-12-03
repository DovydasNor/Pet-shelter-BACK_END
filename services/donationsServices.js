const { ObjectId } = require('mongodb')
const { getDB } = require('../db')

async function postDonation(newDonationData) {
    const db = getDB()
    const donationsCollection = db.collection('donations')

    try {
        const result = await donationsCollection.insertOne(newDonationData)
        console.log('Insert result:', result)
        if (result.acknowledged && result.insertedId) {
            console.log('Donation added successfully:', result.insertedId)
            return { _id: result.insertedId, ...newDonationData }
        } else {
            throw new Error('Failed to add donation')
        }
    } catch (error) {
        console.error('Error adding donation:', error)
        throw new Error('Error adding donation')
    }
}

async function getDonations() {
    const db = getDB()
    const donationsCollection = db.collection('donations')

    try {
        const donations = await donationsCollection.find({}).toArray()
        return donations
    } catch (error) {
        console.error('Error fetching donations:', error)
        throw new Error('Error fetching donations')
    }
}

module.exports = {
    postDonation,
    getDonations
}