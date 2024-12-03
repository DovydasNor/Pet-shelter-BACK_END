const { ObjectId } = require('mongodb')
const { getDB } = require('../db')

async function addComment(petId, comment, volunteerId) {
    const db = getDB()
    const commentsCollection = db.collection('comments')
    const newComment = {
        petId: ObjectId.createFromHexString(petId),
        comment,
        volunteerId: ObjectId.createFromHexString(volunteerId),
        date: new Date()
    }

    try {
        const result = await commentsCollection.insertOne(newComment)
        if (result.insertedCount === 1) {
            console.log('Comment added successfully:', result.ops[0])
            return result.ops[0]
        } else {
            throw new Error('Failed to add comment')
        }
    } catch (error) {
        console.error('Error adding comment:', error)
        throw new Error('Error adding comment')
    }
}

async function deleteComment(commentId) {
    const db = getDB()
    const commentsCollection = db.collection('comments')
  
    try {
      const result = await commentsCollection.deleteOne({ _id: new ObjectId(commentId) })
      return result.deletedCount > 0
    } catch (error) {
      throw new Error('Error deleting comment')
    }
  }

async function getComments(petId) {
    const db = getDB()
    const commentsCollection = db.collection('comments')

    try {
        const comments = await commentsCollection.aggregate([
            { $match: { petId: ObjectId.createFromHexString(petId) } },
            {
                $lookup: {
                    from: 'volunteers',
                    localField: 'volunteerId',
                    foreignField: '_id',
                    as: 'volunteer'
                }
            },
            { $unwind: { path: '$volunteer', preserveNullAndEmptyArrays: true } }
        ]).toArray()

        console.log('Comments after aggregation:', JSON.stringify(comments, null, 2))
        return comments
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw new Error('Error fetching comments')
    }
}

module.exports = {
    addComment,
    getComments,
    deleteComment
}