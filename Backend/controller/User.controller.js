import asyncWrapper from "../middleware/asynchandler.middleware.js"
import Poll from "../model/Poll.model.js"
import ApiError from "../utils/Apierror.utils.js";
import Quizz from "../model/Quizz.model.js"


export const getuserquizandpoll = asyncWrapper(async (req, res, next) => {
  const quizzes = await Quizz.find({ userId: req.user.id });
  const polls = await Poll.find({ userId: req.user.id });

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


