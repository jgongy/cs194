"use strict"

import mongoose = require('mongoose');
import { Vote } from './vote';

/**
 * @openapi
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         __v:
 *           type: number 
 *         author:
 *           type: string
 *         commentedModel:
 *           type: string
 *         creationTime:
 *           type: string
 *           format: date-time
 *         post:
 *           type: string
 *         text:
 *           type: string
 */
const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  commentedModel: {
    type: String,
    enum: ['Battle', 'Comment', 'Submission']
  },
  creationTime: {type: Date, default: Date.now},
  post: { type: mongoose.Schema.Types.ObjectId,
            refPath: 'commentedModel' },
  text: String
});

/* Enforce that each Comment is unique.  */
commentSchema.index(
  { author: 1, commentedModel: 1, post: 1 },
  { unique: true }
);

commentSchema.pre(['deleteMany'], async function() {
  const results = await Comment.find(this.getQuery(), '_id');
  const _ids = results.map(comment => comment._id);
  if (_ids.length === 0) return;

  /* Delete all votes on Comment.  */
  await Vote.deleteMany({
    votedModel: 'Comment',
    post: { $in: _ids }
  });

  /* Delete all replies to Comment.  */
  await Comment.deleteMany({
    commentedModel: 'Comment',
    post: { $in: _ids }
  });
});

const Comment = mongoose.model('Comment', commentSchema);

export { Comment };
