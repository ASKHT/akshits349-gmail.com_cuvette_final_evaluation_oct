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
  const  id  = req.params.id;
  console.log(id)
//   console.log(questions);

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
    const { quizid } = req.params;
    const quiz=  await Quizz.findOneAndDelete({ _id: quizid,userId:req.user.id});
    // console.log(quiz)
    console.log(quiz)
    if (!quiz) {
        return next(
            new ApiError(
                "No Quizz found with this id, or you don't have permission to delete it.",
                404
            )
        );
    }
    // await quiz.save()
    res.status(200).json({ status: 'success' });
});
export const getquiz = asyncWrapper(async (req, res, next) => {
    const { quizid } = req.params;
    // console.log(pollId)
    const quiz = await Quizz.findOne({ _id: quizid});
    if (!poll) {
        throw next(new CustomError(400, "poll does not exist"));
    }
    quiz.impression+=1;
    await quiz.save()
    // console.log(poll)
    res.status(200).json({ quiz });
});


