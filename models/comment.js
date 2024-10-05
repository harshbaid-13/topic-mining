import { Schema, model, models } from "mongoose";

const commentSchema = new Schema({
  comment: {
    type: String,
    required: [true, "Comment is required"],
    minLength: [5, "Comment must be at least 5 characters"],
    maxLength: [150, "Comment must be less than 150 characters"],
  },
});

const Comment = (models && models.Comment) || model("Comment", commentSchema);
export default Comment;
