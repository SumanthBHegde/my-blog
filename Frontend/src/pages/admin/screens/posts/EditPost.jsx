import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { HiOutlineCamera } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";

import { getSinglePost, updatePost } from "../../../../services/index/posts";
import ArticleDetailSkeleton from "../../../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../../components/Errormessage";
import { stables } from "../../../../constants";
import Editor from "../../../../components/editor/Editor";
import MultiSelectTagDropdown from "../../../../components/select-dropdown/MultiSelectTagDropdown";
import { getAllCategories } from "../../../../services/index/postCategories";
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

  // State variables
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const [categories, setCategories] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(null);
  const [postSlug, setPostSlug] = useState(slug);
  const [caption, setCaption] = useState("");

  // Fetch post data
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setInitialPhoto(data?.photo);
      setCategories(data.categories.map((item) => item._id));
      setTitle(data.title);
      setTags(data.tags);
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
    <div className="max-w-6xl mx-auto">
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-forest-800 mb-2">
                Edit Post
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-forest-600 to-forest-400 rounded-full"></div>
            </div>
            <Link
              to="/admin/posts/manage"
              className="px-4 py-2 text-sm font-semibold text-forest-700 bg-white border-2 border-forest-200 rounded-xl hover:bg-forest-50 transition-all duration-200"
            >
              ← Back to Posts
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title Input Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-forest-100 p-6">
                <label
                  className="block mb-3 text-sm font-bold text-forest-800 uppercase tracking-wide"
                  htmlFor="title"
                >
                  Post Title
                </label>
                <input
                  id="title"
                  value={title}
                  className="w-full px-4 py-3 text-xl font-medium transition-all duration-300 border-2 bg-white border-forest-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-forest-100 focus:border-forest-500 placeholder:text-forest-400 text-forest-800"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title..."
                />
              </div>

              {/* Caption Input Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-forest-100 p-6">
                <label
                  className="block mb-3 text-sm font-bold text-forest-800 uppercase tracking-wide"
                  htmlFor="caption"
                >
                  Caption
                </label>
                <input
                  id="caption"
                  value={caption}
                  className="w-full px-4 py-3 transition-all duration-300 border-2 bg-white border-forest-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-forest-100 focus:border-forest-500 placeholder:text-forest-400 text-forest-800"
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Enter a brief caption..."
                />
              </div>

              {/* Slug Input Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-forest-100 p-6">
                <label
                  className="block mb-3 text-sm font-bold text-forest-800 uppercase tracking-wide"
                  htmlFor="slug"
                >
                  URL Slug
                </label>
                <input
                  id="slug"
                  value={postSlug}
                  className="w-full px-4 py-3 font-mono transition-all duration-300 border-2 bg-white border-forest-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-forest-100 focus:border-forest-500 placeholder:text-forest-400 text-forest-800"
                  onChange={(e) =>
                    setPostSlug(
                      e.target.value.replace(/\s+/g, "-").toLowerCase()
                    )
                  }
                  placeholder="post-url-slug"
                />
              </div>

              {/* Editor Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-forest-100 p-6">
                <label className="block mb-4 text-sm font-bold text-forest-800 uppercase tracking-wide">
                  Post Content
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
            <div className="space-y-6">
              {/* Featured Image Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-forest-100 p-6">
                <label className="block mb-4 text-sm font-bold text-forest-800 uppercase tracking-wide">
                  Featured Image
                </label>
                <label
                  htmlFor="postPicture"
                  className="block cursor-pointer group"
                >
                  <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-forest-300 hover:border-forest-500 transition-all duration-300">
                    {photo ? (
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={data?.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : initialPhoto ? (
                      <img
                        src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
                        alt={data?.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    {!photo && !initialPhoto && (
                      <div className="w-full h-48 bg-gradient-to-br from-forest-50 to-earth-50 flex flex-col justify-center items-center gap-2">
                        <HiOutlineCamera className="h-12 w-12 text-forest-400 group-hover:text-forest-600 transition-colors" />
                        <span className="text-sm font-medium text-forest-600">
                          Click to upload image
                        </span>
                      </div>
                    )}
                    {initialPhoto && !photo && (
                      <div
                        style={{ display: "none" }}
                        className="w-full h-48 bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col justify-center items-center gap-2"
                      >
                        <HiOutlineCamera className="h-12 w-12 text-amber-400" />
                        <span className="text-sm font-medium text-amber-600">
                          Image unavailable (click to upload new)
                        </span>
                        <span className="text-xs text-amber-500">
                          Files on free hosting are temporary
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>
                </label>
                <input
                  type="file"
                  className="sr-only"
                  id="postPicture"
                  onChange={handleFileChange}
                />
                {(photo || initialPhoto) && (
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="w-full mt-4 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Delete Image
                  </button>
                )}
              </div>

              {/* Categories Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-forest-100 p-6">
                <label className="block mb-4 text-sm font-bold text-forest-800 uppercase tracking-wide">
                  Categories
                </label>
                {isPostDataLoaded && (
                  <MultiSelectTagDropdown
                    loadOptions={promiseOptions}
                    defaultValue={data.categories.map(categoryToOption)}
                    onChange={(newValue) =>
                      setCategories(newValue.map((item) => item.value))
                    }
                  />
                )}
              </div>

              {/* Tags Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-forest-100 p-6">
                <label className="block mb-4 text-sm font-bold text-forest-800 uppercase tracking-wide">
                  Tags
                </label>
                <p className="text-xs text-forest-600 mb-3">
                  Type and press Enter to add tags
                </p>
                {isPostDataLoaded && (
                  <CreatableSelect
                    defaultValue={data.tags.map((tag) => ({
                      value: tag,
                      label: tag,
                    }))}
                    isMulti
                    onChange={(newValue) =>
                      setTags(newValue.map((item) => item.value))
                    }
                    className="relative z-20"
                    placeholder="Add tags..."
                    formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
                  />
                )}
              </div>

              {/* Update Button */}
              <button
                disabled={isLoadingUpdatePostDetail}
                type="button"
                onClick={handleUpdatePost}
                className="w-full px-6 py-3 font-bold text-white bg-gradient-to-r from-forest-600 to-forest-700 rounded-xl hover:from-forest-700 hover:to-forest-800 disabled:cursor-not-allowed disabled:opacity-70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none"
              >
                {isLoadingUpdatePostDetail ? "Updating..." : "Update Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPost;
