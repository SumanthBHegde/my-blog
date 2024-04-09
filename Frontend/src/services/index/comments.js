import axios from "axios";

// Function to create a new comment
const createNewComment = async ({ token, desc, slug, parent, replyOnUser }) => {
  try {
    // Set up request headers with authorization token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Send a POST request to create a new comment
    const { data } = await axios.post(
      "/api/comments",
      {
        desc,
        slug,
        parent,
        replyOnUser,
      },
      config
    );

    // Return the data received from the server
    return data;
  } catch (error) {
    // Handle errors and throw custom error messages
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

// Function to update an existing comment
const updateComment = async ({ token, desc, commentId, check }) => {
  try {
    // Set up request headers with authorization token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Send a PUT request to update the comment
    const { data } = await axios.put(
      `/api/comments/${commentId}`,
      {
        desc,
        check,
      },
      config
    );

    // Return the data received from the server
    return data;
  } catch (error) {
    // Handle errors and throw custom error messages
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

// Function to delete an existing comment
const deleteComment = async ({ token, commentId }) => {
  try {
    // Set up request headers with authorization token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Send a DELETE request to delete the comment
    const { data } = await axios.delete(`/api/comments/${commentId}`, config);

    // Return the data received from the server
    return data;
  } catch (error) {
    // Handle errors and throw custom error messages
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

const getAllComments = async (
  token,
  searchKeyword = "",
  page = 1,
  limit = 10
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data, headers } = await axios.get(
      `/api/comments?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`,
      config
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

// Export the functions as an object
export { createNewComment, updateComment, deleteComment, getAllComments };
