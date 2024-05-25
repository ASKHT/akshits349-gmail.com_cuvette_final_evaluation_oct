import asyncWrapper from "../middleware/asynchandler.middleware.js"
import Poll from "../model/Poll.model.js"
import ApiError from "../utils/Apierror.utils.js";

export const createpoll = asyncWrapper(async (req, res, next) => {
    try {
        const { category, questions,title} = req.body;
        if (!category || !questions||!title) {
            return res.status(400).json({ message: "please fill all fields" });
        }
        const userId=req.user.id
        const poll = await Poll.create({title,category, questions, userId});
        res.status(200).json({ message: 'Poll created successfully', poll });
    } catch (error) {
        next(error);
    }
});

export const getpoll = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const poll = await Poll.findById(id);
    if (!quiz) {
        return next(new ApiError('Poll does not exist', 404));
    }
    res.status(200).json({ message: "successfully fetched", poll });
});

export const getallpoll = asyncWrapper(async (req, res, next) => {
    const userId = req.userId;
    if (!userId) {
        return next(new ApiError('user does not have any Poll', 404));
    }
    const poll = await Poll.find({ userId: userId });
    res.status(200).json({ message: "successfully fetched", poll });
});

export const deletepoll = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
      await Poll.find({ id: id, userId: req.userId });
    if (!quiz) {
        return next(
            new ApiError(
                "No Poll found with this id, or you don't have permission to delete it.",
                404
            )
        );
    }
    res.status(204).json({ status: 'success' });
});
