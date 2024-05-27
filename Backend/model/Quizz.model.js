import { Schema, model, Types } from "mongoose";
import validator from "validator";
const optionSchema = new Schema({
    text: {
        type: String,
    },
    image: {
        type: String,
        
    },
});

const questionSchema = new Schema({
    question: {
        type: String,
        required: [true, "Please provide the question"],
    },
    optionsType: {
        type: String,
        enum: ["text", "image", "textandimage"],
        required: [true, "Please provide the option type"],
    },
    options: {
        type: [optionSchema],
        required: true,
    },
    answer: {
        type: String,
        required: [true, "Please provide the answer"]
    },
    timer: {
        type: String,
        default:null
    },
    numOfAttempts: {
        type: Number,
        default: 0,
    },
    numOFCorrect: {
        type: Number,
        default: 0,
    },
});

const quizSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide the title"],
            minlength: 3,
        },
        category: {
            type: String,
            required: [true, "Please provide the quiz type"],   
        },
        questions: {
            type: [questionSchema],
            required: [true, "Please provide the questions"],
        },
        impression: {
            type: Number,
            default: 0,
        },
        userId: {
            type: Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Quiz = model("Quiz", quizSchema);
export default Quiz;