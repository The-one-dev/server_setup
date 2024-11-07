import Joi from "joi";

const postSchema = Joi.object({
  title: Joi.string().min(5).max(100).required().messages({
    "string.base": "Title must be a text string.",
    "string.empty": "Title is required and cannot be empty.",
    "string.min": "Title should be at least 5 characters long.",
    "string.max": "Title should not exceed 100 characters.",
    "any.required": "Title is required.",
  }),

  content: Joi.string().min(20).required().messages({
    "string.base": "Content must be a text string.",
    "string.empty": "Content is required and cannot be empty.",
    "string.min": "Content should be at least 20 characters long.",
    "any.required": "Content is required.",
  }),
});

export default postSchema;
