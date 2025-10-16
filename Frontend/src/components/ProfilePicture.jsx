import React, { useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineCamera } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { stables } from "../constants";
import CropEasy from "./crop/CropEasy";
import { updateProfilePicture } from "../services/index/users";
import { userActions } from "../store/reducers/userReducers";
import CloudinaryImage from "./CloudinaryImage";
import { getImageUrl } from "../utils/imageUtils";

const ProfilePicture = ({ avatar }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);

  const { mutate } = useMutation({
    mutationFn: ({ token, formData }) => {
      return updateProfilePicture({
        token: token,
        formData: formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      setOpenCrop(false);
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile Photo is removed");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file });
    setOpenCrop(true);
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your profile picture")) {
      try {
        const formData = new FormData();
        formData.append("profilePicture", undefined);

        mutate({ token: userState.userInfo.token, formData: formData });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById("portal")
        )}

      <div className="flex items-center w-full gap-x-4">
        <div className="relative w-20 h-20 overflow-hidden rounded-full outline outline-offset-2 outline-1 lutline-primary">
          <label
            htmlFor="profilePicture"
            className="absolute inset-0 bg-transparent rounded-full cursor-pointer"
          >
            {avatar ? (
              <CloudinaryImage
                src={getImageUrl(avatar)}
                fallback={
                  <div className="flex items-center justify-center w-full h-full bg-blue-50/50">
                    <HiOutlineCamera className="h-auto w-7 text-primary" />
                  </div>
                }
                alt="profile"
                className="object-cover w-full h-full"
                maxRetries={5}
                retryDelay={2000}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-blue-50/50">
                <HiOutlineCamera className="h-auto w-7 text-primary" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>
        <button
          onClick={handleDeleteImage}
          type="button"
          className="px-4 py-2 text-red-500 border border-red-500 rounded-lg"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default ProfilePicture;
