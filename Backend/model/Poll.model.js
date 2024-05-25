import { Schema, model, Types } from "mongoose";
import validator from "validator";
const optionSchema = new Schema({
  text: {
    type: String
  },
  image: {
    type: String,
    validate: [validator.isURL, 'Enter a valid URL']
  },
  votes: {
    type: Number,
    default: 0
  }
});


const pollQuestionSchema = new Schema(
    {
  question: {
    type: String,
    required: true
  },
  optionsType: {
    type: String,
    enum: ['text', 'image', 'textAndImage'],
    required: true
  },
  options: {
    type: [optionSchema],
    validate: {
      validator: function(options) {
        return options.length > 1 && options.length <= 4;
      },
      message: 'Minimum two option required. Max is four.'
    },
    required: true
  }
}
       
);

const pollSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide the title"],
            minlength: 3,
       
        },
        category: {
            type: String,
            required: [true, "Please provide the quiz type"],
            default:"Poll"
        },
        questions: {
            type: [pollQuestionSchema],
            required: [true, "Please provide the questions"],
        },
        impression: {
            type: Number,
        },
        user: {
            type: Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Poll = model("Poll", pollSchema);
export default Poll;

