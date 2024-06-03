import express from "express"
import {countquizattempt, createquiz,deletequiz,getquiz, updatequiz} from "../controller/Quizz.controller.js"
import { authentication } from "../middleware/authentication.middleware.js";
const router = express.Router();

router.route("/").post(authentication,createquiz)
router.route("/:quizid").delete(authentication,deletequiz);
router.route("/getquiz/:quizid").get(getquiz)
router.route("/updatequiz/:id").put(authentication,updatequiz)
router.route("/userattempt").put(countquizattempt)
export default router;