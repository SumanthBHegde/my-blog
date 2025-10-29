import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { HiOutlineCamera } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import AsyncCreatableSelect from "react-select/async-creatable";

import { getSinglePost, updatePost } from "../../../../services/index/posts";
import ArticleDetailSkeleton from "../../../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../../components/Errormessage";
import { stables } from "../../../../constants";
import Editor from "../../../../components/editor/Editor";
import {
  getAllCategories,
  createCategory,
} from "../../../../services/index/postCategories";
import {
  categoryToOption,
  filterCategories,
} from "../../../../utils/multiSelectTagUtils";

// Function to fetch options for the CreatableSelect component
const promiseOptions = async (inputValue) => {
  const { data: categoriesData } = await getAllCategories();
  return filterCategories(inputValue, categoriesData);
};

const EditPost = () => {
  // Get slug from URL params
  const { slug } = useParams();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  // State variables
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [postSlug, setPostSlug] = useState(slug);
  const [caption, setCaption] = useState("");

  // Fetch post data
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setInitialPhoto(data?.photo);
      setCategories(data?.categories?.map((item) => item._id) || []);
      setTitle(data?.title || "");
      setTags(data?.tags || []);
      setBody(data?.body);
      setCaption(data?.caption || "");
      setPostSlug(data?.slug || slug);
    },
    refetchOnWindowFocus: false,
  });

  // Mutation for updating post details
  const {
    mutate: mutateUpdatePostDetail,
    isLoading: isLoadingUpdatePostDetail,
  } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return updatePost({
        updatedData,
        slug,
        token,
      });
    },
    onSuccess: (data) => {
      // Invalidate query and show success message
      toast.success("Post is updated");
      navigate(`/admin/posts/manage/edit/${data.slug}`, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Mutation for creating new categories
  const { mutate: mutateCreateCategory } = useMutation({
    mutationFn: ({ token, title }) => {
      return createCategory({ token, title });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["categories"]);
      toast.success(`Category "${data.title}" created`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Handler for creating new categories or selecting existing ones
  const handleCategoryChange = async (newValue, actionMeta) => {
    if (actionMeta.action === "create-option") {
      // User created a new category
      const newCategoryTitle = actionMeta.option.value;

      // Create the category in the backend
      mutateCreateCategory(
        {
          token: userState.userInfo.token,
          title: newCategoryTitle,
        },
        {
          onSuccess: (data) => {
            // After creating, update the categories state
            // Replace the temporary new option with the actual category ID
            const updatedCategories = newValue.map((item) => {
              // If this is the newly created item, use the ID from backend
              if (item.__isNew__ && item.value === newCategoryTitle) {
                return data._id;
              }
              // Otherwise, use the existing value
              return item.value;
            });
            setCategories(updatedCategories);
          },
        }
      );
    } else {
      // Normal selection/deselection
      setCategories(newValue.map((item) => item.value));
    }
  };

  // Event handler for file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  // Event handler for updating post
  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    // Prepare data for update
    if (!initialPhoto && photo) {
      // New photo uploaded
      updatedData.append("postPicture", photo);
    } else if (initialPhoto && photo) {
      // Photo changed - upload new one
      updatedData.append("postPicture", photo);
    }
    // If initialPhoto exists and no new photo, don't append anything
    // The backend will keep the existing photo reference

    updatedData.append(
      "document",
      JSON.stringify({ body, categories, title, tags, slug: postSlug, caption })
    );

    // Call mutation to update post
    mutateUpdatePostDetail({
      updatedData,
      slug,
      token: userState.userInfo.token,
    });
  };

  // Event handler for deleting post image
  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your Post picture?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };

  // Check if post data is loaded
  let isPostDataLoaded = !isLoading && !isError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50/30 to-earth-50/30">
      <div className="max-w-5xl px-4 py-6 mx-auto sm:px-6 lg:px-8 sm:py-8">
        {isLoading ? (
          <ArticleDetailSkeleton />
        ) : isError ? (
          <ErrorMessage message="Couldn't fetch the post detail" />
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold sm:text-3xl text-forest-900">
                  Edit Post
                </h1>
                <p className="mt-1 text-sm text-forest-600">
                  Update your blog post details
                </p>
              </div>
              <Link
                to="/admin/posts/manage"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors border rounded-lg text-forest-700 bg-white/80 backdrop-blur-sm border-forest-200 hover:bg-white hover:border-forest-300"
              >
                ← Back
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
              {/* Main Content */}
              <div className="space-y-4 sm:space-y-5 lg:col-span-2">
                {/* Title Input */}
                <div className="p-4 transition-shadow bg-white border rounded-lg sm:p-5 border-forest-100 hover:shadow-md">
                  <label
                    className="block mb-2 text-sm font-semibold text-forest-800"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    value={title}
                    className="w-full px-3 py-2.5 text-base font-medium transition-colors border rounded-lg sm:text-lg border-forest-200 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent placeholder:text-forest-400 text-forest-900"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your post title"
                  />
                </div>

                {/* Caption Input */}
                <div className="p-4 transition-shadow bg-white border rounded-lg sm:p-5 border-forest-100 hover:shadow-md">
                  <label
                    className="block mb-2 text-sm font-semibold text-forest-800"
                    htmlFor="caption"
                  >
                    Caption
                  </label>
                  <input
                    id="caption"
                    value={caption}
                    className="w-full px-3 py-2.5 text-sm transition-colors border rounded-lg sm:text-base border-forest-200 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent placeholder:text-forest-400 text-forest-900"
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Brief description of your post"
                  />
                </div>

                {/* Slug Input */}
                <div className="p-4 transition-shadow bg-white border rounded-lg sm:p-5 border-forest-100 hover:shadow-md">
                  <label
                    className="block mb-2 text-sm font-semibold text-forest-800"
                    htmlFor="slug"
                  >
                    URL Slug
                  </label>
                  <input
                    id="slug"
                    value={postSlug}
                    className="w-full px-3 py-2.5 text-sm font-mono break-all transition-colors border rounded-lg border-forest-200 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent placeholder:text-forest-400 text-forest-900"
                    onChange={(e) =>
                      setPostSlug(
                        e.target.value.replace(/\s+/g, "-").toLowerCase()
                      )
                    }
                    placeholder="post-url-slug"
                  />
                </div>

                {/* Editor */}
                <div className="p-4 transition-shadow bg-white border rounded-lg sm:p-5 border-forest-100 hover:shadow-md">
                  <label className="block mb-3 text-sm font-semibold text-forest-800">
                    Content
                  </label>
                  {isPostDataLoaded && (
                    <Editor
                      content={data?.body}
                      editable={true}
                      onDataChange={(data) => {
                        setBody(data);
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4 sm:space-y-5">
                {/* Featured Image */}
                <div className="p-4 transition-shadow bg-white border rounded-lg sm:p-5 border-forest-100 hover:shadow-md">
                  <label className="block mb-3 text-sm font-semibold text-forest-800">
                    Featured Image
                  </label>
                  <label
                    htmlFor="postPicture"
                    className="block cursor-pointer group"
                  >
                    <div className="relative overflow-hidden transition-all border-2 border-dashed rounded-lg border-forest-300 hover:border-forest-500 hover:bg-forest-50/30">
                      {photo ? (
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={data?.title}
                          className="object-cover w-full h-48 sm:h-56"
                        />
                      ) : initialPhoto ? (
                        <img
                          src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
                          alt={data?.title}
                          className="object-cover w-full h-48 sm:h-56"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                            e.target.nextElementSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      {!photo && !initialPhoto && (
                        <div className="flex flex-col items-center justify-center w-full h-48 gap-3 sm:h-56">
                          <HiOutlineCamera className="w-12 h-12 transition-colors text-forest-400 group-hover:text-forest-600" />
                          <div className="text-center">
                            <p className="text-sm font-medium text-forest-700">
                              Upload Image
                            </p>
                            <p className="mt-1 text-xs text-forest-500">
                              Click or drag to upload
                            </p>
                          </div>
                        </div>
                      )}
                      {initialPhoto && !photo && (
                        <div
                          style={{ display: "none" }}
                          className="flex flex-col items-center justify-center w-full h-48 gap-3 sm:h-56 bg-amber-50"
                        >
                          <HiOutlineCamera className="w-12 h-12 text-amber-400" />
                          <div className="text-center">
                            <p className="text-sm font-medium text-amber-600">
                              Image unavailable
                            </p>
                            <p className="mt-1 text-xs text-amber-500">
                              Click to upload new
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    className="sr-only"
                    id="postPicture"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {(photo || initialPhoto) && (
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      className="w-full px-4 py-2 mt-3 text-sm font-medium text-red-700 transition-colors border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 hover:border-red-300"
                    >
                      Remove Image
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="p-4 transition-shadow bg-white border rounded-lg sm:p-5 border-forest-100 hover:shadow-md">
                  <label className="block mb-2 text-sm font-semibold text-forest-800">
                    Categories
                  </label>
                  <p className="mb-3 text-xs text-forest-600">
                    Type to search or create new
                  </p>
                  {isPostDataLoaded && (
                    <AsyncCreatableSelect
                      defaultValue={
                        data?.categories?.map(categoryToOption) || []
                      }
                      isMulti
                      onChange={handleCategoryChange}
                      className="text-sm"
                      placeholder="Select categories..."
                      formatCreateLabel={(inputValue) =>
                        `Create "${inputValue}"`
                      }
                      loadOptions={promiseOptions}
                      cacheOptions
                      defaultOptions
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: "#d1d5db",
                          "&:hover": { borderColor: "#9ca3af" },
                        }),
                      }}
                    />
                  )}
                </div>

                {/* Tags */}
                <div className="p-4 transition-shadow bg-white border rounded-lg sm:p-5 border-forest-100 hover:shadow-md">
                  <label className="block mb-2 text-sm font-semibold text-forest-800">
                    Tags
                  </label>
                  <p className="mb-3 text-xs text-forest-600">
                    Type and press Enter
                  </p>
                  {isPostDataLoaded && (
                    <CreatableSelect
                      defaultValue={
                        data?.tags?.map((tag) => ({
                          value: tag,
                          label: tag,
                        })) || []
                      }
                      isMulti
                      onChange={(newValue) =>
                        setTags(newValue.map((item) => item.value))
                      }
                      className="text-sm"
                      placeholder="Add tags..."
                      formatCreateLabel={(inputValue) =>
                        `Create "${inputValue}"`
                      }
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: "#d1d5db",
                          "&:hover": { borderColor: "#9ca3af" },
                        }),
                      }}
                    />
                  )}
                </div>

                {/* Update Button */}
                <button
                  disabled={isLoadingUpdatePostDetail}
                  type="button"
                  onClick={handleUpdatePost}
                  className="w-full px-5 py-3 text-sm font-semibold text-white transition-all rounded-lg shadow-sm bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 disabled:cursor-not-allowed disabled:opacity-60 hover:shadow-md active:scale-[0.98]"
                >
                  {isLoadingUpdatePostDetail ? "Updating..." : "Update Post"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPost;
