import express from "express"
import {getpoll,getallpoll,deletepoll,createpoll} from "../controller/Poll.controller.js"
import { authentication } from "../middleware/authentication.middleware.js";
const router = express.Router();

router.route("/").get(getallpoll).post(authentication,createpoll)
router.route("/getpoll").get(getpoll)
router.route("/deletepoll").delete(authentication,deletepoll)

export default router;