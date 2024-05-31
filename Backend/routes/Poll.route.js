import express from "express"
import {getallpoll,createpoll,getPoll,deletepoll,countPoll, updatePoll} from "../controller/Poll.controller.js"
import { authentication } from "../middleware/authentication.middleware.js";
const router = express.Router();

router.route("/").get(getallpoll).post(authentication,createpoll)
router.route("/userAttempt").put(countPoll);
router.route("/:pollId").delete(authentication, deletepoll).get(getPoll);
router.route("/updatepoll/:id").put(authentication,updatePoll)
export default router;