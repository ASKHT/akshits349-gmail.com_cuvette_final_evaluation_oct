import asyncWrapper from "../middleware/asynchandler.middleware.js"
import Poll from "../model/Poll.model.js"
import ApiError from "../utils/Apierror.utils.js";
import Quizz from "../model/Quizz.model.js"
import Othererrors from "../utils/othererror.utils.js";
export const getuserquizandpoll = asyncWrapper(async (req, res, next) => {
  const quizzes = await Quizz.find({ userId: req.user.id });
  const polls = await Poll.find({ userId: req.user.id });
   if(!quizzes){
    return next(
            new Othererrors(
              404,
                "quiz not found",
            )
        );
   }
   if(!polls){
    return next(
            new Othererrors(
              404,
                "poll not found",
            )
        );
   }
  const userDocs = [...quizzes, ...polls];
  const data = userDocs.sort((a, b) => {
    const createdAtA = new Date(a.createdAt).getTime();
    const createdAtB = new Date(b.createdAt).getTime();
    return createdAtB - createdAtA;
  });
  // console.log(docs);
  res.status(200).json({
    message: 'success',
    results: data.length,
    data
  });
});


export const questionwisseanalysis = asyncWrapper(async (req, res, next) => {
  const {id}=req.params
  const quizzes = await Quizz.findOne({_id:id, userId: req.user.id });
  const polls = await Poll.findOne({ _id:id,userId: req.user.id });

let data;
  if(quizzes!==null){
         data=quizzes
  }
else if(polls!==null){
  data=polls
}
  // console.log(docs);
  res.status(200).json({
    message: 'success',
    results: data.length,
    data
  });
});

export const getstats=asyncWrapper(async(req,res,next)=>{
      const userid=req.user.id;
      const poll=await Poll.find({userId:userid})
      const quiz=await Quizz.find({userId:userid})
      const stats={}
      stats.totalquiz=poll.length+quiz.length;
      let totalquizquestion=0;
      let totalpollquestion=0;
      poll.forEach((q)=>{
         totalpollquestion+=q.questions.length;
      })
      quiz.forEach((q)=>{
         totalquizquestion+=q.questions.length;
      })
     stats.totalQuestions =totalpollquestion+totalquizquestion;
      let totalPollImpressions = 0;
  let totlaQuizImpressions = 0;

  quiz.forEach(quiz => {
    totlaQuizImpressions += quiz.impression;
  });

  poll.forEach(poll => {
    totalPollImpressions += poll.impression;
  });

  stats.totalImpressions = totalPollImpressions + totlaQuizImpressions;

  res.status(200).json({
    status: 'success',
    data: { stats }
  });
})