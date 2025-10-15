import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useDataTable } from "../../../../hooks/useDataTable";
import {
  deleteUser,
  getAllUsers,
  updateProfile,
} from "../../../../services/index/users";
import DataTable from "../../components/DataTable";
import { images, stables } from "../../../../constants";

const Users = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: usersData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () =>
      getAllUsers(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: "users",
    deleteDataMessage: "User is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteUser({
        slug,
        token,
      });
    },
  });

  const { mutate: mutateUpdateUser, isLoading: isLoadingUpdateUser } =
    useMutation({
      mutationFn: ({ isAdmin, userId }) => {
        return updateProfile({
          token: userState.userInfo.token,
          userData: { admin: isAdmin },
          userId,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["users"]);
        toast.success("User is updated");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleAdminCheck = (event, userId) => {
    const initialCheckValue = !event.target.checked;

    if (
      window.confirm("Do you want to change the admin status of this user?")
    ) {
      mutateUpdateUser({ isAdmin: event.target.checked, userId });
    } else {
      event.target.checked = initialCheckValue;
    }
  };

  return (
    <DataTable
      pageTitle="Manage Users"
      dataListName="Users"
      searchInputPlaceHolder="User's email..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Name",
        "Email",
        "Created At",
        "is Verified",
        "is Admin",
        "",
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={usersData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={usersData?.headers}
      userState={userState}
    >
      {usersData?.data.map((user) => (
        <tr key={user._id}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={
                      user?.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL + user?.avatar
                        : images.userImage
                    }
                    alt={user.name}
                    className="object-cover w-10 mx-auto rounded-lg aspect-square"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-forest-800 whitespace-no-wrap">
                  {user.name}
                </p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-forest-800 whitespace-no-wrap">{user.email}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-forest-800 whitespace-no-wrap">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-forest-800 whitespace-no-wrap">
              {user.verified ? "✅" : "❌"}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <input
              type="checkbox"
              className="w-5 h-5 text-forest-600 bg-white border-2 border-forest-300 rounded focus:ring-forest-500 focus:ring-2 checked:bg-forest-600 checked:border-forest-600 disabled:bg-forest-200 disabled:opacity-50"
              defaultChecked={user.admin}
              onChange={(event) => handleAdminCheck(event, user._id)}
              disabled={isLoadingUpdateUser}
            />
          </td>
          <td className="px-5 py-5 space-x-5 text-sm bg-white border-b border-gray-200">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-700 hover:text-red-800 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler({
                  slug: user?._id,
                  token: userState.userInfo.token,
                });
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default Users;
