import asyncWrapper from "../middleware/asynchandler.middleware.js"
import Quizz from "../model/Quizz.model.js"
import ApiError from "../utils/Apierror.utils.js";
import Othererrors from "../utils/othererror.utils.js"
export const createquiz =asyncWrapper( async(req,res,next)=>{
        const {title,questions,category} = req.body;
        // console.log(title,questions,category)
        if(!title||!questions){
            return res.status(400).json({message:"please fill all fields"})
        }
        const userId=req.user.id
        const quiz=await Quizz.create({title,category,questions,userId})
        
        res.status(200).json({ message: 'Quiz created successfully',quiz });
})

export const updatequiz =asyncWrapper( async(req,res,next)=>{
  const {category, questions,title } = req.body;
  console.log(questions)
  const  id  = req.params.id;
  // console.log(id)
  const quiz = await Quizz.findOneAndUpdate(
    {
      _id: id,
      userId: req.user.id
    },
    { category, questions,title},
    { new: true }
  );
       if (!quiz) {
    return next(
      new ApiError("quiz not found, or you dont't have permission to edit it",404)
    );
  }
  res.status(200).json({
    status: 'success',
    message: "data updated sucessfully",
    quiz
  });
})
 

export const getallquiz = asyncWrapper(async (req, res, next) => {
    const userId = req.userId;
    if (!userId) {
        return next(new ApiError('user does not have any Quizz', 404));
    }
    const quiz = await Quizz.find({ userId: userId });
    res.status(200).json({ message: "successfully fetched", quiz });
});

export const deletequiz = asyncWrapper(async (req, res, next) => {
     const {quizid } = req.params;
    // console.log(quizid);
    try {
        const quiz = await Quizz.findOneAndDelete({ _id: quizid, userId: req.user.id });
        if (!quiz) {
            return res.status(404).json({
                message: "No quiz found with this id, or you don't have permission to delete it.",
                status: 'error'
            });
        }
        return res.status(200).json({ message: "Poll deleted successfully", status: 'success' });
    } catch (error) {
        console.error("Error deleting quiz:", error);
        return res.status(500).json({ message: "An error occurred while deleting the quiz.", status: 'error' });
    }
});
export const getquiz = asyncWrapper(async (req, res, next) => {
    const { quizid } = req.params;
    // console.log(pollId)
    const quiz = await Quizz.findOne({ _id: quizid});
    if (!quiz) {
        throw next(new Othererrors(400, "quiz does not exist"));
    }
    quiz.impression+=1;
    await quiz.save()
    // console.log(poll)
    res.status(200).json({ quiz });
});
export const countquizattempt = asyncWrapper(async (req, res, next) => {
    const { quizId, questionId, answer } = req.body;
    console.log(answer)
    const quiz = await Quizz.findOne({ _id: quizId });
    const question = quiz.questions.find((item) => item._id == questionId);
    question.numOfAttempts += 1;
    if (question.answer ==answer) {
        question.numOFCorrect += 1;
    }
    await quiz.save();
    res.status(200).json({ message: "success",answer:answer });
});


