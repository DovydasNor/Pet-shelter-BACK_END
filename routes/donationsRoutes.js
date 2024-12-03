const express = require('express')
const donationsServices = require('../services/donationsServices')
const router = express.Router()

router.post('/donations', async (req, res) => {
  const newDonationData = req.body

  try {
    const resData = await donationsServices.postDonation(newDonationData)
    return res.send(resData)
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
})

router.get('/donations', async (req, res) => {
  try {
    const resData = await donationsServices.getDonations()
    return res.send(resData)
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
})

module.exports = router