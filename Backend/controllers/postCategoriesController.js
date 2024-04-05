import PostCategories from "../models/PostCategories";
import Post from "../models/Post";

// Controller function to create a new post category
const createPostCategory = async (req, res, next) => {
  try {
    const { title } = req.body;

    // Check if the category with the provided title already exists
    const postCategory = await PostCategories.findOne({ title });

    if (postCategory) {
      const error = new Error("Category is already created!");
      return next(error);
    }

    // Create a new PostCategory document
    const newPostCategory = new PostCategories({ title });

    // Save the new category to the database
    const savedPostCategory = await newPostCategory.save();

    // Return the newly created category as a response
    return res.status(201).json(savedPostCategory);
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

// Controller function to get all post categories
const getAllPostCategories = async (req, res, next) => {
  try {
    // Find all post categories in the database
    const postCategories = await PostCategories.find({});

    // Return the list of categories as a JSON response
    return res.json(postCategories);
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

// Controller function to update a post category
const updatePostCategory = async (req, res, next) => {
  try {
    const { title } = req.body;

    // Find the post category by ID and update its title
    const postCategory = await PostCategories.findByIdAndUpdate(
      req.params.postCategoryId,
      { title },
      { new: true }
    );

    // If the category was not found, return an error
    if (!postCategory) {
      const error = new Error("Category was not found");
      return next(error);
    }

    // Return the updated category as a response
    return res.json(postCategory);
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

// Controller function to delete a post category
const deletePostCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.postCategoryId;

    // Remove references to the category from associated posts
    await Post.updateMany(
      { categories: { $in: [categoryId] } },
      { $pull: { categories: categoryId } }
    );

    // Delete the post category from the database
    await PostCategories.deleteOne({ _id: categoryId });

    // Send a success message as a response
    res.send({ message: "Post category is successfully deleted!" });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

// Export the controller functions for use in routes
export {
  createPostCategory,
  getAllPostCategories,
  updatePostCategory,
  deletePostCategory,
};
