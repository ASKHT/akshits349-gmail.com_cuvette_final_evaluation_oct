import asyncWrapper from "../middleware/asynchandler.middleware.js"
import Poll from "../model/Poll.model.js"
import ApiError from "../utils/Apierror.utils.js";
import Othererrors from "../utils/othererror.utils.js"
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


export const getallpoll = asyncWrapper(async (req, res, next) => {
    const userId = req.userId;
    if (!userId) {
        return next(new ApiError('user does not have any Poll', 404));
    }
    const poll = await Poll.find({ userId: userId });
    res.status(200).json({ message: "successfully fetched", poll });
});

export const deletepoll = asyncWrapper(async (req, res, next) => {
   const { pollId } = req.params;
    console.log(pollId);
    try {
        const poll = await Poll.findOneAndDelete({ _id: pollId, userId: req.user.id });
        if (!poll) {
            return res.status(404).json({
                message: "No Poll found with this id, or you don't have permission to delete it.",
                status: 'error'
            });
        }
        return res.status(200).json({ message: "Poll deleted successfully", status: 'success' });
    } catch (error) {
        // Handle error gracefully
        console.error("Error deleting poll:", error);
        return res.status(500).json({ message: "An error occurred while deleting the poll.", status: 'error' });
    }
});
export const getPoll = asyncWrapper(async (req, res, next) => {
    const { pollId } = req.params;
    console.log(pollId)
    const poll = await Poll.findOne({ _id: pollId });
    console.log(poll)
    if (!poll) {
        throw next(new Othererrors(400, "poll does not exist"));
    }
    poll.impression+=1;
    await poll.save();
    res.status(200).json({ poll });
});
export const countPoll = asyncWrapper(async (req, res, next) => {
    const { pollId, questionId, optionId } = req.body;
    const poll = await Poll.findOne({ _id: pollId });
    const question = poll.questions.find((item) => item._id == questionId);
    const option = question.options.find((item) => item._id == optionId);
    option.votes += 1;
    await poll.save();
    res.status(200).json({ message: "success" });
});
export const updatePoll = asyncWrapper(async (req, res, next) => {
  const {category, questions,title } = req.body;
  const  id  = req.params.id;
  console.log(id)
  console.log(questions);

  const poll = await Poll.findOneAndUpdate(
    {
      _id: id,
      userId: req.user.id
    },
    { category, questions,title},
    { new: true }
  );

  if (!poll) {
    return next(
      new ApiError("Poll not found, or you dont't have permission to edit it")
    );
  }
  res.status(200).json({
    status: 'success',
    message: "data updated sucessfully",
    poll
  });
});