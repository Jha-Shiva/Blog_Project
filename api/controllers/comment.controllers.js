import Comment from '../models/comment.model.js';

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    console.log('userId', userId);
    console.log('req.userid', req.user.id);
    if (userId !== req.user.id) {
      return next(
       {status: 403, message: 'You are not allowed to create this comment'}
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};
