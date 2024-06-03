import express from "express"
import { getuserquizandpoll,questionwisseanalysis, getstats } from "../controller/User.controller.js"
import { authentication } from "../middleware/authentication.middleware.js";
const router = express.Router();
router.get('/pollandquiz', authentication, getuserquizandpoll);
router.get('/questionanalysis/:id',authentication,questionwisseanalysis )
router.get('/getstats',authentication,getstats)
export default router;