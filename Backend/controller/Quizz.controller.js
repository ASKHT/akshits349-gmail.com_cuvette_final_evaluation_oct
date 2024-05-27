import asyncWrapper from "../middleware/asynchandler.middleware.js"
import Quizz from "../model/Quizz.model.js"
import ApiError from "../utils/Apierror.utils.js";
export const createquiz =asyncWrapper( async(req,res,next)=>{
    // console.log(data)
        const {title,questions,category} = req.body;
        console.log(title,questions,category)
        if(!title||!questions){
            return res.status(400).json({message:"please fill all fields"})
        }
        const userId=req.user.id
        const quiz=await Quizz.create({title,category,questions,userId})
        
        res.status(200).json({ message: 'Quiz created successfully',quiz });
})
 
export const getquiz =asyncWrapper(async (req,res,next)=>{
        const {id}=req.params;
        const quiz=await Quizz.findById(id);
         if (!quiz) {
         return next(new ApiError('Quiz does not exist', 404));
         }
        res.status(200).json({ message:"successfully fetched",quiz})
       
})

export const getallquiz=asyncWrapper(async (req,res,next)=>{
        const userId=req.userId;
        if(!userId) {
             return next(new ApiError('user does not have any quiz', 404));
        }
        const quiz=await Quizz.find({userId:userId})
    
        res.status(200).json({ message:"successfully fetched",quiz})
})

export const deletequiz = asyncWrapper(async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id, req.user.id);

         await Quizz.findOneAndDelete({ _id: id, userId: req.user.id });
        res.status(200).json({
            status: 'success'
        });
    } catch (error) {
        // Pass the error to the error handling middleware
        res.status(400).send(error.message);
    }
});




// export const updatequiz=asyncWrapper(async (req,res,next)=>{
//     const {timer,title,questions}=req.body;
//     const {id}=req.params;

// })

