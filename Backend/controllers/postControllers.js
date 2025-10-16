import { uploadPicture } from "../middleware/uploadPictureMiddleware.js";
import Post from "../models/Post.js";
import Comment from "../models/Comments.js";
import { cloudinary } from "../config/cloudinary.js";
import { v4 as uuidv4 } from "uuid";

// Controller function to create a new post
const createPost = async (req, res, next) => {
  try {
    console.log("Creating new post for user:", req.user._id);

    // Verify Cloudinary configuration
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Cloudinary configuration missing:", {
        cloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: !!process.env.CLOUDINARY_API_KEY,
        apiSecret: !!process.env.CLOUDINARY_API_SECRET,
      });
    }

    // Create a new post object with default values
    const post = new Post({
      title: "sample title",
      caption: "sample caption",
      slug: uuidv4(),
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      user: req.user._id,
    });

    // Save the new post to the database
    const createdPost = await post.save();
    console.log("Post created successfully:", createdPost._id);
    return res.json(createdPost);
  } catch (error) {
    console.error("Error in createPost:", error.message, error.stack);
    next(error);
  }
};

// Controller function to update an existing post
const updatePost = async (req, res, next) => {
  try {
    // Find the post to be updated by slug
    const post = await Post.findOne({ slug: req.params.slug });

    // Check if the post exists
    if (!post) {
      const error = new Error("Post was not found");
      next(error);
      return;
    }

    // Define the multer upload function for handling file uploads
    const upload = uploadPicture.single("postPicture");

    // Function to handle updating post data in the database
    const handleUpdatePostData = async (data) => {
      const { title, caption, slug, body, tags, categories } = JSON.parse(data);
      // Update post fields with new values if provided, otherwise keep existing values
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;

      // Save the updated post to the database
      const updatedPost = await post.save();
      return updatedPost;
    };

    // Use multer to handle file upload
    upload(req, res, async function (err) {
      if (err) {
        // Handle errors that occur during file upload
        const error = new Error(
          "An unknown error occurred when uploading: " + err.message
        );
        next(error);
        return; // Exit the callback function if there's an error
      }

      // If file upload is successful
      if (req.file) {
        // Delete old image from Cloudinary if exists
        if (post.photo) {
          try {
            // Extract public_id from Cloudinary URL
            const publicId = post.photo
              .split("/")
              .slice(-2)
              .join("/")
              .split(".")[0];
            await cloudinary.uploader.destroy(publicId);
          } catch (error) {
            console.error("Error deleting old image from Cloudinary:", error);
          }
        }
        // Store the full Cloudinary URL
        post.photo = req.file.path;
      } else if (req.body.document) {
        // If explicitly removing image (no file uploaded)
        const parsedData = JSON.parse(req.body.document);
        if (parsedData.removePhoto && post.photo) {
          try {
            const publicId = post.photo
              .split("/")
              .slice(-2)
              .join("/")
              .split(".")[0];
            await cloudinary.uploader.destroy(publicId);
            post.photo = "";
          } catch (error) {
            console.error("Error deleting image from Cloudinary:", error);
          }
        }
      }

      // Update post data in the database (ensure await)
      const updatedPost = await handleUpdatePostData(req.body.document);
      res.json(updatedPost);
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    // Find the post with the provided slug and delete it
    const post = await Post.findOneAndDelete({ slug: req.params.slug });

    // If the post doesn't exist, return an error
    if (!post) {
      const error = new Error("Post aws not found");
      return next(error);
    }

    // If the post is deleted successfully, also delete all associated comments
    await Comment.deleteMany({ post: post._id });

    // Return a success message
    return res.json({
      message: "Post is successfully deleted",
    });
  } catch (error) {
    // If an error occurs, pass it to the error-handling middleware
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    // Find the post with the given slug and populate its 'user' and 'comments' fields
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["avatar", "name"],
      },
      {
        path: "categories",
        select: ["title"],
      },
      {
        path: "comments",
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["avatar", "name"],
          },
          {
            path: "replies",
            match: {
              check: true,
            },
            populate: [
              {
                path: "user",
                select: ["avatar", "name"],
              },
            ],
          },
        ],
      },
    ]);

    // If the post is not found, return an error
    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    // Delete image from Cloudinary if exists
    if (post.photo) {
      try {
        const publicId = post.photo
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    }

    // Return the retrieved post as a JSON response
    return res.json(post);
  } catch (error) {
    // If an error occurs, pass it to the error-handling middleware
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    // Retrieve all posts from the database and populate the 'user' field with selected attributes
    const filter = req.query.searchKeyword;
    let where = {};
    if (filter) {
      where.title = { $regex: filter, $options: "i" };
    }

    let query = Post.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;

    const total = await Post.countDocuments(where);
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pagesize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }

    const result = await query
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: "user",
          select: ["avatar", "name", "verified"],
        },
        {
          path: "categories",
          select: ["title"],
        },
      ])
      .sort({ updatedAt: "desc" });

    // Return the retrieved posts as a JSON response
    return res.json(result);
  } catch (error) {
    // If an error occurs, pass it to the error-handling middleware
    next(error);
  }
};

export { createPost, updatePost, deletePost, getPost, getAllPosts };
