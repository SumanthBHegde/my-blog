import { useMemo } from "react";

// Constant to represent dots in pagination
export const DOTS = "...";

// Custom hook for pagination logic
export const usePagination = ({
  siblingCount = 1,
  currentPage,
  totalPageCount,
}) => {
  const paginationRange = useMemo(() => {
    // Calculate total page numbers to be shown
    const totalPageNumbers = siblingCount + 5;

    // State 1: if the number of pages is less than the page numbers
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // Calculate the left and right sibling index
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    // Determine whether to show left dots, right dots, or both
    const shoudShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // State 2: No left dots to show, but right dots to be shown
    if (!shoudShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftrange = range(1, leftItemCount);

      return [...leftrange, DOTS, totalPageCount];
    }

    // State 3: No right dots to show, but left dots to be shown
    if (shoudShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    // State 4: Both left and right dots to be shown
    if (shoudShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, middleRange, DOTS, lastPageIndex];
    }
  }, [siblingCount, currentPage, totalPageCount]);

  return paginationRange;
};

// Utility function to generate range of numbers
function range(start, end) {
  const length = end - start + 1;

  return Array.from({ length }, (value, index) => index + start);
}
