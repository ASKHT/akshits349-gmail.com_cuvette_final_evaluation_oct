import express from "express"
import { getuserquizandpoll} from "../controller/User.controller.js"
import { authentication } from "../middleware/authentication.middleware.js";
const router = express.Router();
router.get('/pollandquiz', authentication, getuserquizandpoll);
export default router;