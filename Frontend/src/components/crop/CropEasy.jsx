import React, { useState } from "react";
import Cropper from "react-easy-crop";

import getCroppedImg from "./cropImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePicture } from "../../services/index/users";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";
import { toast } from "react-hot-toast";

const CropEasy = ({ photo, setOpenCrop }) => {
  // Redux Hooks
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // React Query Hooks
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, formData }) => {
      return updateProfilePicture({
        token: token,
        formData: formData,
      });
    },
    onSuccess: (data) => {
      // Update user info in Redux store and local storage
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      // Close the cropping modal
      setOpenCrop(false);
      // Invalidate profile query to refetch updated data
      queryClient.invalidateQueries(["profile"]);
      // Show success toast notification
      toast.success("Profile Photo is updated");
    },
    onError: (error) => {
      // Show error toast notification
      toast.error(error.message);
    },
  });

  // State variables for cropping
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Handle crop completion
  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // Handle image cropping
  const handleCropImage = async () => {
    try {
      // Get cropped image
      const croppedImg = await getCroppedImg(photo?.url, croppedAreaPixels);

      // Create a file from cropped image
      const file = new File([croppedImg.file], `${photo?.file?.name}`, {
        type: photo?.file?.type,
      });

      // Create form data with cropped image file
      const formData = new FormData();
      formData.append("profilePicture", file);

      // Perform mutation to update profile picture
      mutate({ token: userState.userInfo.token, formData: formData });
    } catch (error) {
      // Show error toast notification
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed z-[1000] inset-0 bg-black/50 flex justify-center p-5 overflow-auto">
      <div className="bg-white h-fit w-full sm:max-w-[350px] p-5 rounded-lg">
        <h2 className="mb-2 font-semibold text-dark-hard">Crop Image</h2>
        <div className="relative w-full overflow-hidden rounded-lg aspect-square">
          {/* Cropper component for image cropping */}
          <Cropper
            image={photo?.url}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div>
          {/* Zoom range input */}
          <label
            htmlFor="zoomRange"
            className="block mt-2 mb-0.5 text-sm font-medium text-gray-900"
          >
            Zoom: {`${Math.round(zoom * 100)}%`}
          </label>
          <input
            type="range"
            id="zoomRange"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
          />
        </div>
        {/* Buttons for actions */}
        <div className="flex flex-wrap justify-between gap-2">
          <button
            disabled={isLoading}
            onClick={() => setOpenCrop(false)}
            className="px-5 py-2.5 rounded-lg text-red-500 border border-red-500 text-sm disabled:opacity-70"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={handleCropImage}
            className="px-5 py-2.5 rounded-lg text-white bg-blue-500 text-sm disabled:opacity-70"
          >
            Crop & Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;
