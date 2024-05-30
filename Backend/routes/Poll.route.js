import express from "express"
import {getallpoll,createpoll,getPoll,deletepoll,countPoll} from "../controller/Poll.controller.js"
import { authentication } from "../middleware/authentication.middleware.js";
const router = express.Router();

router.route("/").get(getallpoll).post(authentication,createpoll)
router.route("/userAttempt").put(countPoll);
router.route("/:pollId").delete(authentication, deletepoll).get(getPoll);

export default router;