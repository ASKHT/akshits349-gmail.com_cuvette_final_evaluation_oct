import express from "express"
import {createquiz,getquiz,getallquiz,deletequiz} from "../controller/Quizz.controller.js"
import { authentication } from "../middleware/authentication.middleware.js";
const router = express.Router();

router.route("/").get(getallquiz).post(authentication,createquiz)
router.route("/getquiz").get(getquiz)
router.route("/deletequiz/:id").delete(authentication,deletequiz)

export default router;