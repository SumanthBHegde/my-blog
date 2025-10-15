import moonpkg from "mongoose";
const { Schema, model } = moonpkg;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title must be at least 5 characters long"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    caption: {
      type: String,
      required: [true, "Caption is required"],
      maxlength: [500, "Caption cannot exceed 500 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
    },
    body: { type: Object, required: [true, "Body is required"] },
    photo: { type: String, required: false },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    tags: { type: [String] },
    categories: [{ type: Schema.Types.ObjectId, ref: "PostCategories" }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// Add indexes for performance
PostSchema.index({ user: 1 });
PostSchema.index({ categories: 1 });
PostSchema.index({ createdAt: -1 }); // For sorting by date

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

const Post = model("Post", PostSchema);
export default Post;

