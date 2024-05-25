import ApiError from "../utils/Apierror.utils.js";
import { jwtVerify } from "../utils/Token.util.js";

export const authentication = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    
    if (!token) {
        return next(new ApiError(401, "Unauthorized access"));
    }

    try {
        const {id} = jwtVerify(token);
        req.user = {id};
        next()
    } catch (error) {
        return next(new ApiError(401, "token expired"));
    }
};


