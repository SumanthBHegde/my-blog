import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useDataTable = ({
  dataQueryFn,
  dataQueryKey,
  mutateDeleteFn,
  deleteDataMessage,
}) => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryFn: dataQueryFn,
    queryKey: [dataQueryKey, currentPage, searchKeyword],
    onError: (err) => {
      toast.error(err.message);
      console.error("Data fetch error:", err);
    },
    retry: 2,
    retryDelay: 1000,
  });

  const { mutate: mutateDeletePost, isLoading: isLoadingDeleteData } =
    useMutation({
      mutationFn: mutateDeleteFn,
      onSuccess: (data) => {
        queryClient.invalidateQueries([dataQueryKey]);
        toast.success(deleteDataMessage);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const deleteDataHandler = ({ slug, token }) => {
    if (window.confirm("Do you want to delete this record?")) {
      mutateDeletePost({ slug, token });
    }
  };

  return {
    userState,
    currentPage,
    searchKeyword,
    data,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
    isError,
    error,
  };
};
