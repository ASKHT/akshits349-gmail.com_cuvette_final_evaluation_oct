import User from "../model/User.model.js";
import asyncWrapper from "../middleware/asynchandler.middleware.js";
import ApiError from "../utils/Apierror.utils.js";
import { createJwtToken } from "../utils/Token.util.js";

// register
export const register = asyncWrapper(async (req, res, next) => {
    const { name, email, password,confirmPassword } = req.body;

    if (!name || !email || !password||!confirmPassword) {
        throw next(new ApiError("400", "required field missing"));
    }
     
    const emailAlreadyExist = await User.findOne({ email });
    if (emailAlreadyExist) {
        return next(new ApiError("400", "email already exist"));
    }

    const user = await User.create(req.body);
    const token = createJwtToken({ id: user._id });
    user.password = undefined; // removing password before sending to frontend
    res.status(200).json({
        success: true,
        message: "user registered successfully",
        user,
        token,
    });
});

// login
export const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ApiError(400, "required field missing"));
    }

    const user = await User.findOne({ email });
    if (!user) {
        return next(new ApiError(404, "user not found"));
    }
    const verifyPassword = await user.comparePassword(password);
    if (!verifyPassword) {
        return next(new ApiError(401, "invalid credentials"));
    }

    const token = createJwtToken({ id: user._id});
    user.password = undefined;
    res.status(200).json({
        message: "login successful",
        user,
        token,
        
    });
});


