const { getDB } = require('../db')
const { ObjectId } = require('mongodb')

const getUsers = async () => {
  const db = await getDB()
  const users = await db.collection('users').find({}).toArray()
  return users
}

const setAsVolunteer = async (userId) => {
  const db = await getDB()
  await db.collection('users').updateOne(
    { _id: new ObjectId(userId) },
    { $set: { type: 'volunteer' } }
  )
}

const getUser = async (userId) => {
  const db = await getDB()
  const user = await db.collection('users').findOne({ _id: new ObjectId(userId) })
  return user
}

const editUser = async (userId, user) => {
  const db = await getDB()
  await db.collection('users').updateOne(
    { _id: new ObjectId(userId) },
    { $set: user }
  )
}

module.exports = { getUsers, setAsVolunteer, getUser, editUser }