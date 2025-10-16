import axios from "../axios";

// Helper function for retrying requests
const retryRequest = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (
      retries > 0 &&
      (error.code === "NETWORK_ERROR" || error.response?.status >= 500)
    ) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

// Helper function for error handling
const handleError = (error) => {
  if (error.response && error.response.data.message) {
    throw new Error(error.response.data.message);
  }
  if (error.code === "NETWORK_ERROR") {
    throw new Error(
      "Network error. Please check your connection and try again."
    );
  }
  throw new Error(error.message || "An unexpected error occurred");
};

export const getAllPosts = async (searchKeyword = "", page = 1, limit = 10) => {
  try {
    const result = await retryRequest(() =>
      axios.get(
        `/api/posts?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
      )
    );
    return { data: result.data, headers: result.headers };
  } catch (error) {
    handleError(error);
  }
};

export const getSinglePost = async ({ slug }) => {
  try {
    const result = await retryRequest(() => axios.get(`/api/posts/${slug}`));
    return result.data;
  } catch (error) {
    handleError(error);
  }
};

export const deletePost = async ({ slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const result = await retryRequest(() =>
      axios.delete(`/api/posts/${slug}`, config)
    );
    return result.data;
  } catch (error) {
    handleError(error);
  }
};

export const updatePost = async ({ updatedData, slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const result = await retryRequest(() =>
      axios.put(`/api/posts/${slug}`, updatedData, config)
    );
    return result.data;
  } catch (error) {
    handleError(error);
  }
};

export const createPost = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const result = await retryRequest(() =>
      axios.post(`/api/posts`, {}, config)
    );
    return result.data;
  } catch (error) {
    handleError(error);
  }
};
