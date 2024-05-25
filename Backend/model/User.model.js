import { Schema, model, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide the name"],
            minlength: [4,'name must be at least 4 characters long']
        },
        email: {
            type: String,
            required: [true, "Please provide the email"],
            validate: {
                validator: validator.isEmail,
                message: "Please provide valid email",
            },
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please provide the password"],
             minlength: [6, 'Password must be at least 6 characters long']
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (password) {
    const comparePassword = await bcrypt.compare(password, this.password);
    return comparePassword;
};

const User = model("User", userSchema);
export default User;

