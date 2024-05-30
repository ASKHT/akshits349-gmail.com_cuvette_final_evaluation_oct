import express from "express"
import {createquiz,deletequiz,getquiz} from "../controller/Quizz.controller.js"
import { authentication } from "../middleware/authentication.middleware.js";
const router = express.Router();

router.route("/").post(authentication,createquiz)
router.route("/getquiz").get(getquiz)
router.route("/:quizid").delete(authentication,deletequiz);

export default router;